import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = 3000

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url

  if (filePath === './') {
    filePath = './index.html'
  }

  const ext = path.extname(filePath)

  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  }

  const contentType = contentTypes[ext] || 'text/plain'

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    res.writeHead(200, {
      'Content-Type': contentType,
    })

    res.end(content)
  })
})

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`

  console.log(`Server running at ${url}`)
})
