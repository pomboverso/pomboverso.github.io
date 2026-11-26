// Stands in for the Iqra API: same paths and shapes, answered inside the browser from the
// static files in ./data. Importing this file takes over `fetch` for "/api/..." only.
// To use the real backend, remove its import from js/app.js.
import { MockRepo, ApiError } from "./repo.js";
import mako from "./data/mako.js";
import txori from "./data/txori.js";

const projects = [mako, txori];
const cache = new Map();

function repo(name) {
  const data = projects.find((p) => p.name === name);
  if (!data) throw new ApiError(`There is no project named "${name}".`, 404);
  if (!cache.has(name)) {
    const r = new MockRepo(structuredClone(data), async (hash) => data.diffs[hash] ?? {});
    cache.set(name, r.seed().then(() => r));
  }
  return cache.get(name);
}

// --- issues ---------------------------------------------------------------------------------

const PAGE = 50;

function issues(name, page) {
  const data = projects.find((p) => p.name === name);
  if (!data) throw new ApiError(`There is no project named "${name}".`, 404);
  const all = data.issues;
  return {
    issues: all.slice((page - 1) * PAGE, page * PAGE),
    note: all.length ? null : `No issues in the demo data for ${data.slug}.`,
    nextPage: page * PAGE < all.length ? page + 1 : null,
  };
}

// --- identities and folders --------------------------------------------------------------

let identities = [
  { id: "id-1", name: "Demo User", avatarUrl: null, keyName: "id_ed25519 (demo)", publicKey: null, isActive: true },
];
let identityCount = 1;

function identityRoute(method, [id, action], body) {
  if (method === "POST" && !id) {
    // only the file's name is looked at: a visitor's key is never read or kept
    const keyName = body.get("key")?.name ?? "key";
    identities.push({
      id: `id-${++identityCount}`,
      name: body.get("name") || keyName,
      avatarUrl: null,
      keyName,
      publicKey: null,
      isActive: !identities.length,
    });
  } else if (method === "POST" && action === "activate") {
    identities.forEach((i) => (i.isActive = i.id === id));
  } else if (method === "DELETE") {
    identities = identities.filter((i) => i.id !== id);
    if (identities.length && !identities.some((i) => i.isActive)) identities[0].isActive = true;
  }
  return { identities };
}

const TREE = {
  "/": ["home"],
  "/home": ["demo"],
  "/home/demo": ["Projects", ".config"],
  "/home/demo/Projects": ["mako", "txori"],
  "/home/demo/Projects/mako": [],
  "/home/demo/Projects/txori": [],
  "/home/demo/.config": [],
};

function folders(query) {
  const path = (query.get("path") || "/home/demo").replace(/(.)\/+$/, "$1");
  const names = TREE[path];
  if (!names) throw new ApiError(`The folder ${path} does not exist.`, 404);
  const join = (n) => `${path === "/" ? "" : path}/${n}`;
  const isRepo = (p) => /\/Projects\/[^/]+$/.test(p);
  return {
    path,
    parent: path === "/" ? null : path.slice(0, path.lastIndexOf("/")) || "/",
    home: "/home/demo",
    isRepo: isRepo(path),
    truncated: false,
    folders: names
      .filter((n) => query.has("hidden") || !n.startsWith("."))
      .map((name) => ({ name, path: join(name), isRepo: isRepo(join(name)) })),
  };
}

function addProject() {
  const names = projects.map((p) => p.name).join(" and ");
  throw new ApiError(`This is a demo: only ${names} are available. Close this and pick one with "open a saved project".`, 403);
}

// --- routing ------------------------------------------------------------------------------

const ACTIONS = {
  "POST stage": (r, b) => r.setStaged(b.paths, true),
  "POST unstage": (r, b) => r.setStaged(b.paths, false),
  "POST stage-lines": (r, b) => r.stageLines(b),
  "POST discard": (r, b) => r.discard(b),
  "POST commits": (r, b) => r.createCommit(b),
  "POST checkout": (r, b) => r.checkout(b),
  "POST cherry-pick": (r, b) => r.cherryPick(b),
  "POST merge": (r, b) => r.merge(b),
  "POST push": (r) => r.push(),
  "POST pull": (r) => r.pull(),
  "POST branches": (r, b) => r.createBranch(b),
  "DELETE branches": (r, b, q) => r.deleteBranch({ name: q.get("name"), force: q.get("force") === "true" }),
  "DELETE remote-branches": (r, b, q) => r.deleteRemoteBranch({ name: q.get("name") }),
  "POST stashes/push": (r, b) => r.stashPush(b),
  "POST stashes/pop": (r) => r.stashPop(),
  "DELETE stashes": (r, b, q) => r.stashDrop({ id: q.get("id") }),
  "GET commits": (r, b, q) => r.log({ limit: q.get("limit") ?? 200, cursor: q.get("cursor") }),
  "GET status": (r) => r.status(),
  "GET diff": (r, b, q) => r.diff({ path: q.get("path"), staged: q.get("staged") === "1", commit: q.get("commit") }),
  "GET branches": (r) => ({ branches: r.branchList() }),
  "GET remote-branches": (r) => ({ branches: [...r.remotes.keys()].map((name) => ({ name })) }),
  "GET stashes": (r) => ({ stashes: r.stashList() }),
  "GET submodules": (r) => ({ submodules: r.submodules }),
  "POST submodules/update": (r) => ({ submodules: r.submodules }),
};

async function route(method, url, body) {
  const parts = url.pathname.split("/").slice(2).map(decodeURIComponent); // drop "/api"
  const [root, ...rest] = parts;
  if (root === "projects") {
    if (method !== "GET") return addProject();
    return {
      projects: projects.map(({ name, slug, defaultBranch }) => ({
        name,
        description: `github.com/${slug}`,
        defaultBranch,
      })),
    };
  }
  if (root === "fs") return folders(url.searchParams);
  if (root === "identities") return identityRoute(method, rest, body);
  if (root === "repos") {
    const [name, ...action] = rest;
    if (method === "GET" && action[0] === "issues") {
      return issues(name, Number(url.searchParams.get("page")) || 1);
    }
    const handler = ACTIONS[`${method} ${action.join("/")}`];
    if (handler) return handler(await repo(name), body, url.searchParams);
  }
  throw new ApiError(`The demo does not emulate ${method} ${url.pathname}.`, 404);
}

async function apiFetch(input, { method = "GET", body } = {}) {
  const url = new URL(input, "http://demo.invalid");
  const json = (value, status = 200) =>
    new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json" } });
  await new Promise((resolve) => setTimeout(resolve, 80)); // a little network feel
  try {
    return json(await route(method, url, typeof body === "string" ? JSON.parse(body) : body));
  } catch (err) {
    if (!(err instanceof ApiError)) console.error(err);
    return json({ error: err.message }, err.status ?? 500);
  }
}

const browserFetch = window.fetch.bind(window);
window.fetch = (input, options) =>
  typeof input === "string" && input.startsWith("/api/")
    ? apiFetch(input, options)
    : browserFetch(input, options);
