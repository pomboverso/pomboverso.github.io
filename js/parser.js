const DEFAULT_TAG = 'p'

function parseInline(content) {
  return content
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>')
}

export function parse(template) {
  const match = template.match(/^\[(\w+)\]\((.+)\)$/s)

  if (match) {
    const [, tag, content] = match
    return `<${tag}>${parseInline(content)}</${tag}>`
  }

  return `<${DEFAULT_TAG}>${parseInline(template)}</${DEFAULT_TAG}>`
}