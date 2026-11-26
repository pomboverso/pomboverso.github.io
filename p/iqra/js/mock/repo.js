// An in-memory git repository built from a snapshot. Nothing here touches a real repo:
// every change lives until the page is reloaded.
import { countChanges, sidePatch } from "./patch.js";

export class ApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
const fail = (message, status) => {
  throw new ApiError(message, status);
};

const randomHash = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(20)), (b) => b.toString(16).padStart(2, "0")).join("");

const DEMO_AUTHOR = { name: "Demo User", email: "demo@example.com", avatarUrl: null };

// a changed file of the working copy; `mask` has one flag per +/- line
function workingFile(path, status, data, staged = false) {
  const n = data.binary ? 0 : countChanges(data.patch);
  return { path, status, binary: !!data.binary, patch: data.patch ?? "", mask: Array(Math.max(n, 1)).fill(staged) };
}
const hasSide = (file, side) => file.mask.includes(side === "staged");

export class MockRepo {
  #loadDiffs;

  constructor(snapshot, loadDiffs) {
    this.name = snapshot.name;
    this.slug = snapshot.slug;
    this.defaultBranch = snapshot.defaultBranch;
    this.commits = snapshot.commits;
    this.byHash = new Map(this.commits.map((c) => [c.hash, c]));
    this.branches = new Map(snapshot.branches.map((b) => [b.name, b.hash]));
    this.remotes = new Map(snapshot.remotes.map((b) => [`origin/${b.name}`, b.hash]));
    this.tags = new Map(snapshot.tags.map((t) => [t.name, t.hash]));
    this.submodules = snapshot.submodules;
    this.branch = this.defaultBranch; // null while detached
    this.detached = null; // the hash HEAD sits on while detached
    this.created = new Map(); // diffs of commits made in the demo
    this.stashes = [];
    this.changes = [];
    this.#loadDiffs = loadDiffs;
  }

  // Made-up uncommitted work, cut from real commits of this repository.
  async seed() {
    const usable = this.commits.filter(
      (c) => c.parents.length === 1 && c.files.some((f) => f.status === "M" && /\.(kt|kts|java|xml|md|json|js)$/.test(f.path)),
    );
    const taken = new Set();
    const pick = async (commit, max) => {
      const diffs = await this.diffsOf(commit.hash);
      const files = [];
      for (const f of commit.files) {
        const d = diffs[f.path];
        if (files.length >= max || taken.has(f.path) || !d || d.binary || d.truncated) continue;
        taken.add(f.path);
        files.push(workingFile(f.path, f.status, d));
      }
      return files;
    };
    const richest = [...usable.slice(0, 40)].sort((a, b) => b.files.length - a.files.length);
    if (richest[0]) this.changes = await pick(richest[0], 5);
    this.changes.slice(0, 2).forEach((f) => f.mask.fill(true));
    for (const commit of richest.slice(1)) {
      if (this.stashes.length >= 2) break;
      const files = await pick(commit, 3);
      if (!files.length) continue;
      this.#addStash(files, this.defaultBranch, `WIP: ${commit.message.split("\n")[0]}`, commit.committedAt, "push");
    }
  }

  async diffsOf(hash) {
    return this.created.get(hash) ?? (await this.#loadDiffs(hash));
  }

  get head() {
    return this.detached ?? this.branches.get(this.branch);
  }

  commit(hash) {
    return this.byHash.get(hash) ?? this.commits.find((c) => c.hash.startsWith(hash)) ?? fail(`Unknown commit ${hash}.`, 404);
  }

  // --- reading ------------------------------------------------------------------------

  log({ limit = 200, cursor = 0 } = {}) {
    const refs = new Map();
    const add = (hash, ref) => (refs.get(hash) ?? refs.set(hash, []).get(hash)).push(ref);
    for (const [name, hash] of this.branches) add(hash, { name, type: "branch", isHead: name === this.branch });
    for (const [name, hash] of this.remotes) add(hash, { name, type: "remote", isHead: false });
    for (const [name, hash] of this.tags) add(hash, { name, type: "tag", isHead: false });
    if (this.detached) add(this.detached, { name: "HEAD", type: "head", isHead: true });

    // only what a ref still reaches: a deleted branch takes its own commits with it
    const alive = this.ancestors(...this.branches.values(), ...this.remotes.values(), ...this.tags.values(), this.head);
    const list = this.commits.filter((c) => alive.has(c.hash));
    const start = Number(cursor) || 0;
    const end = start + Number(limit);
    return {
      repository: this.name,
      currentBranch: this.branch,
      commits: list.slice(start, end).map((c) => ({ ...c, refs: refs.get(c.hash) ?? [] })),
      nextCursor: end < list.length ? String(end) : null,
    };
  }

  ancestors(...hashes) {
    const seen = new Set();
    const todo = [...hashes];
    while (todo.length) {
      const hash = todo.pop();
      if (seen.has(hash) || !this.byHash.has(hash)) continue;
      seen.add(hash);
      todo.push(...this.byHash.get(hash).parents);
    }
    return seen;
  }

  branchList() {
    const list = [...this.branches.keys()].map((name) => ({ name, isDefault: name === this.branch, isDetached: false }));
    if (this.detached) list.unshift({ name: this.detached.slice(0, 7), isDefault: true, isDetached: true });
    return list;
  }

  status() {
    const side = (name) =>
      this.changes
        .filter((f) => hasSide(f, name))
        .map(({ path, status }) => ({ path, status }))
        .sort((a, b) => a.path.localeCompare(b.path));
    return { staged: side("staged"), unstaged: side("unstaged") };
  }

  async diff({ path, staged, commit }) {
    if (commit) {
      const stash = this.stashes.find((s) => s.hash === commit);
      const found = stash
        ? stash.changes.find((f) => f.path === path)
        : (await this.diffsOf(this.commit(commit).hash))[path];
      if (!found) fail("There is no diff for that file.", 404);
      const status = (stash ?? this.commit(commit)).files.find((f) => f.path === path)?.status ?? "M";
      return { path, status, binary: !!found.binary, truncated: !!found.truncated, patch: found.patch };
    }
    const file = this.#file(path);
    const side = staged ? "staged" : "unstaged";
    const whole = file.mask.every((m) => m === staged);
    return {
      path,
      status: file.status,
      binary: file.binary,
      patch: whole || file.binary ? file.patch : sidePatch(file.patch, file.mask, side),
    };
  }

  // --- the working copy ---------------------------------------------------------------

  #file(path) {
    return this.changes.find((f) => f.path === path) ?? fail(`${path} has no changes.`, 404);
  }

  setStaged(paths, staged) {
    for (const path of paths) this.#file(path).mask.fill(staged);
    return {};
  }

  // `lines` counts the +/- lines of the side the person is looking at
  stageLines({ path, staged, lines }) {
    const file = this.#file(path);
    const shown = file.mask.flatMap((m, i) => (m === !!staged ? [i] : []));
    for (const n of lines) if (n in shown) file.mask[shown[n]] = !staged;
    return {};
  }

  // keeps only the lines of one side of a file, as a file of its own
  #only(file, side, staged = false) {
    if (file.mask.every((m) => m === (side === "staged"))) return { ...file, mask: file.mask.map(() => staged) };
    return workingFile(file.path, file.status, { patch: sidePatch(file.patch, file.mask, side) }, staged);
  }

  discard({ paths, all }) {
    const hit = this.changes.filter((f) => hasSide(f, "unstaged") && (all || paths.includes(f.path)));
    for (const file of hit) {
      const i = this.changes.indexOf(file);
      if (hasSide(file, "staged")) this.changes[i] = this.#only(file, "staged", true);
      else this.changes.splice(i, 1);
    }
    return { discarded: hit.length };
  }

  #requireClean() {
    if (this.changes.length) fail("There are changed files. Commit, stash or discard them first.", 409);
  }

  // --- commits ------------------------------------------------------------------------

  #insert({ message, parents, files, diffs }) {
    const hash = randomHash();
    const commit = {
      hash,
      shortHash: hash.slice(0, 7),
      parents,
      author: DEMO_AUTHOR,
      committedAt: new Date().toISOString(),
      message,
      files,
    };
    this.commits.unshift(commit);
    this.byHash.set(hash, commit);
    this.created.set(hash, diffs);
    return commit;
  }

  #moveHead(hash) {
    if (this.detached) this.detached = hash;
    else this.branches.set(this.branch, hash);
  }

  async createCommit({ message, amend }) {
    const staged = this.changes.filter((f) => hasSide(f, "staged"));
    if (!amend && !staged.length) fail("Stage some files first.");
    const head = this.commit(this.head);
    const files = amend ? [...head.files] : [];
    const diffs = amend ? { ...(await this.diffsOf(head.hash)) } : {};
    for (const file of staged) {
      const { path, status, binary, patch } = this.#only(file, "staged");
      if (!files.some((f) => f.path === path)) files.push({ path, status });
      diffs[path] = { binary, patch };
    }
    const commit = this.#insert({
      message: message || head.message,
      parents: amend ? head.parents : [head.hash],
      files,
      diffs,
    });
    this.#moveHead(commit.hash);
    this.changes = this.changes.flatMap((f) => {
      if (!hasSide(f, "staged")) return [f];
      if (!hasSide(f, "unstaged")) return [];
      const rest = this.#only(f, "unstaged");
      return [{ ...rest, status: "M" }];
    });
    return { commit: { ...commit, refs: [] } };
  }

  async cherryPick({ commit: hash }) {
    this.#requireClean();
    const source = this.commit(hash);
    if (source.parents.length > 1) fail("Merge commits cannot be cherry picked.");
    if (this.ancestors(this.head).has(source.hash)) fail("That commit is already part of this branch.", 409);
    const commit = this.#insert({
      message: source.message,
      parents: [this.head],
      files: source.files,
      diffs: await this.diffsOf(source.hash),
    });
    this.#moveHead(commit.hash);
    return {};
  }

  // --- branches -----------------------------------------------------------------------

  // Unlike git, the demo never refuses a checkout: uncommitted changes simply ride along.
  checkout({ branch, remote, commit }) {
    if (remote) {
      const hash = this.remotes.get(remote) ?? fail(`Unknown remote branch ${remote}.`, 404);
      branch = remote.slice(remote.indexOf("/") + 1);
      if (!this.branches.has(branch)) this.branches.set(branch, hash);
    }
    if (branch) {
      if (!this.branches.has(branch)) fail(`Unknown branch ${branch}.`, 404);
      this.branch = branch;
      this.detached = null;
    } else {
      const target = this.commit(commit).hash;
      this.detached = target;
      this.branch = null;
    }
    return { currentBranch: this.branch };
  }

  createBranch({ name }) {
    if (!/^(?![-./])(?!.*(\.\.|\/\/|@\{))[^\s~^:?*[\\]+(?<![./])$/.test(name)) fail(`"${name}" is not a valid branch name.`);
    if (this.branches.has(name)) fail(`A branch named "${name}" already exists.`, 409);
    this.branches.set(name, this.head);
    this.branch = name;
    this.detached = null;
    return { currentBranch: name };
  }

  deleteBranch({ name, force }) {
    if (!this.branches.has(name)) fail(`Unknown branch ${name}.`, 404);
    if (name === this.branch) fail("The checked-out branch cannot be deleted.", 409);
    const hash = this.branches.get(name);
    const others = [...this.branches].filter(([n]) => n !== name).map(([, h]) => h);
    if (!force && !this.ancestors(...others, ...this.remotes.values(), this.head).has(hash)) {
      fail(`The branch "${name}" is not fully merged.`, 409);
    }
    this.branches.delete(name);
    return {};
  }

  deleteRemoteBranch({ name }) {
    if (!this.remotes.delete(name)) fail(`Unknown remote branch ${name}.`, 404);
    return {};
  }

  merge({ source, target }) {
    this.#requireClean();
    const from = this.branches.get(source) ?? fail(`Unknown branch ${source}.`, 404);
    const into = this.branches.get(target) ?? fail(`Unknown branch ${target}.`, 404);
    this.branch = target;
    this.detached = null;
    if (this.ancestors(into).has(from)) return { outcome: "upToDate", currentBranch: target };
    if (this.ancestors(from).has(into)) {
      this.branches.set(target, from);
      return { outcome: "fastForward", currentBranch: target };
    }
    const commit = this.#insert({
      message: `Merge branch '${source}' into ${target}`,
      parents: [into, from],
      files: [],
      diffs: {},
    });
    this.branches.set(target, commit.hash);
    return { outcome: "merged", currentBranch: target };
  }

  push() {
    if (this.detached) fail("HEAD is detached: check out a branch to push.", 409);
    this.remotes.set(`origin/${this.branch}`, this.head);
    return {};
  }

  pull() {
    if (this.detached) fail("HEAD is detached: check out a branch to pull.", 409);
    const upstream = this.remotes.get(`origin/${this.branch}`) ?? fail("This branch has no remote branch yet.", 409);
    if (this.ancestors(upstream).has(this.head)) this.#moveHead(upstream);
    return {};
  }

  // --- stashes ------------------------------------------------------------------------

  #addStash(changes, branch, message, createdAt = new Date().toISOString(), where = "unshift") {
    const hash = randomHash();
    this.stashes[where]({
      hash,
      shortHash: hash.slice(0, 7),
      branch,
      message,
      createdAt,
      changes,
      files: changes.map(({ path, status }) => ({ path, status })),
    });
  }

  stashList() {
    return this.stashes.map(({ changes, ...s }, i) => ({ id: `stash@{${i}}`, ...s }));
  }

  stashPush({ message }) {
    if (!this.changes.length) fail("There are no changes to stash.");
    const branch = this.branch ?? "HEAD";
    this.#addStash(this.changes, branch, message?.trim() || `WIP on ${branch}`);
    this.changes = [];
    return {};
  }

  stashPop() {
    const stash = this.stashes[0] ?? fail("No stash entries found.");
    const clash = stash.changes.find((f) => this.changes.some((c) => c.path === f.path));
    if (clash) fail(`${clash.path} already has changes. Commit or discard them first.`, 409);
    this.stashes.shift();
    this.changes.push(...stash.changes);
    return {};
  }

  stashDrop({ id }) {
    const i = Number(/^stash@\{(\d+)\}$/.exec(id)?.[1] ?? -1);
    if (!this.stashes[i]) fail("That stash does not exist.", 404);
    this.stashes.splice(i, 1);
    return {};
  }
}
