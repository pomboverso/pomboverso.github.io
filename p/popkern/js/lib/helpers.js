export const titleCase = (label) => {
  return label
    .replace(/_/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => {
      return word.toUpperCase();
    })
    .trim()
    .replace(/-/g, " ");
}

export const spinalCase = (label) => {
  return label
    .replace(/[!,.*+?^${(|[\\})\]:]/g, '')
    .replace(/&/g, 'and')
    .trim()
    .replace(/[ ]{1,}/g, "-")
    .toLowerCase();
}

export const pascalCase = (label) => {
  return label
    .replace(/[!,.*+?^${(|[\\})\]:]/g, '')
    .replace(/&/g, 'and')
    .trim()
    .replace(/[ ]{1,}/g, "");
}

