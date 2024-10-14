
import express from 'express'
import path from 'path'
import url from 'url'

const app = express()
app.set('port', process.env.PORT || 3000)
const port = app.get('port')

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(['/', '/home'], (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Welcome to my website')
})

app.get('/image', (req, res) => {
    serveFile(res, path.join(__dirname, './imgs/image.jpg'), 'image/jpeg')
})

app.get('/pdf', (req, res) => {
    serveFile(res, path.join(__dirname, './docs/document.pdf'), 'application/pdf')
})

app.get('/about', (req, res) => {
    serveFile(res, path.join(__dirname, './about/about.txt'), 'text/plain')
})

app.use((req, res) => {
    res.status(404).send('Not found')
})

function serveFile(res, filePath, contentType) {
    res.sendFile(filePath, { headers: {'Content-Type': contentType} }, 
        (err) => {
            if (err) res.status(500).send('Internal Server Error')
        }
    )
}

app.listen(port, () => console.log(`Running on ${port}`))