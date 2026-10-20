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

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function parseMdInline(text) {
  const codes = []
  // pull inline code out first so its content is not touched by other rules
  let result = escapeHtml(text).replace(/`([^`]+)`/g, (_, code) => {
    codes.push(code)
    return `\u0000${codes.length - 1}\u0000`
  })
  result = parseInline(result)
  return result.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`)
}

/**
 * Minimal markdown -> HTML. Supports headings (#..######), fenced code blocks,
 * blockquotes, unordered/ordered lists, paragraphs, and inline
 * **bold**, *em*, `code` and [links](https://...).
 */
export function parseMarkdown(md) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const out = []
  let i = 0

  const isBlockStart = line =>
    /^(#{1,6})\s/.test(line) || /^```/.test(line) || /^>/.test(line) || /^\s*([-*]|\d+\.)\s/.test(line)

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    const fence = line.match(/^```(\w*)/)
    if (fence) {
      const code = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++])
      i++ // closing fence
      const lang = fence[1] ? ` data-lang="${fence[1]}"` : ''
      out.push(`<pre${lang}><code>${escapeHtml(code.join('\n'))}</code></pre>`)
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      out.push(`<h${level}>${parseMdInline(heading[2].trim())}</h${level}>`)
      i++
      continue
    }

    if (/^>/.test(line)) {
      const quote = []
      while (i < lines.length && /^>/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''))
      out.push(`<blockquote>${parseMdInline(quote.join(' ').trim())}</blockquote>`)
      continue
    }

    const list = line.match(/^\s*([-*]|\d+\.)\s/)
    if (list) {
      const ordered = /\d/.test(list[1])
      const items = []
      while (i < lines.length && /^\s*([-*]|\d+\.)\s/.test(lines[i])) {
        items.push(lines[i++].replace(/^\s*([-*]|\d+\.)\s+/, ''))
      }
      const tag = ordered ? 'ol' : 'ul'
      out.push(
        `<${tag} class="unordered-list">${items.map(li => `<li>${parseMdInline(li)}</li>`).join('')}</${tag}>`
      )
      continue
    }

    const para = []
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) para.push(lines[i++])
    out.push(`<p>${parseMdInline(para.join(' '))}</p>`)
  }

  return out.join('\n')
}
