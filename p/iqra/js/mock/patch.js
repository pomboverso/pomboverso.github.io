// Splits a unified diff by line, so single lines can be staged and unstaged.
const HUNK = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@(.*)$/;

export const countChanges = (patch) => {
  let inHunk = false;
  let n = 0;
  for (const line of patch.split("\n")) {
    if (line.startsWith("@@")) inHunk = true;
    else if (inHunk && (line[0] === "+" || line[0] === "-")) n++;
  }
  return n;
};

// `mask[i]` says whether the i-th changed line of `patch` is staged. Returns the patch
// of one side: "staged" is HEAD -> index, "unstaged" is index -> working copy.
export function sidePatch(patch, mask, side) {
  const staged = side === "staged";
  const head = [];
  const hunks = [];
  let hunk = null;
  let n = 0;
  let kept = false; // whether the line above survived (for "\ No newline" notes)
  for (const line of patch.split("\n")) {
    const start = HUNK.exec(line);
    if (start) {
      hunk = { oldNo: Number(start[1]), newNo: Number(start[2]), tail: start[3], lines: [] };
      hunks.push(hunk);
    } else if (!hunk) {
      if (line) head.push(line);
    } else if (line[0] === "+" || line[0] === "-") {
      const mine = mask[n++] === staged;
      const add = line[0] === "+";
      // a change of the other side is either already there (context) or not yet (gone)
      const asContext = staged ? !add : add;
      kept = mine || asContext;
      if (mine) hunk.lines.push(line);
      else if (asContext) hunk.lines.push(` ${line.slice(1)}`);
    } else if (line[0] === "\\") {
      if (kept) hunk.lines.push(line);
    } else if (line) {
      hunk.lines.push(line);
      kept = true;
    }
  }

  let shift = 0;
  const body = [];
  for (const h of hunks) {
    if (!h.lines.some((l) => l[0] === "+" || l[0] === "-")) continue;
    const olds = h.lines.filter((l) => l[0] === " " || l[0] === "-").length;
    const news = h.lines.filter((l) => l[0] === " " || l[0] === "+").length;
    const from = staged ? h.oldNo : h.newNo;
    const to = from + shift;
    shift += news - olds;
    body.push(`@@ -${from},${olds} +${to},${news} @@${h.tail}`, ...h.lines);
  }
  return [...head, ...body].join("\n") + "\n";
}
