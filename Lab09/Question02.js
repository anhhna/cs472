import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (method === 'GET') {
        switch (url) {
            case '/home':
            case '/':
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end('Welcome to my website')
                break

            case '/image':
                serveFile(res, './imgs/image.jpg', 'image/jpeg')
                break

            case '/pdf':
                serveFile(res, './docs/document.pdf', 'application/pdf')
                break

            case '/about':
                serveFile(res, './about/about.txt', 'text/plain')
                break

            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not found')
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not found')
    }
})

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Internal Server Error')
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data);
        }
    })
}

const PORT = 3000
server.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})