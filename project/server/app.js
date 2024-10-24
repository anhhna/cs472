import express from 'express'
import cors from 'cors'
import dictionaryRouter from './route/dictionaryRoute.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const app = express()

app.set('port', process.env.PORT || 3001)
const port = app.get('port')
app.use(cors())
app.use(express.json())

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dictionary API',
            version: '1.0.0',
            description: 'API for searching and managing dictionary terms'
        },
        servers: [
            {
                url: `https://cs472-tvu2.onrender.com`
            },
        ]
    },
    apis: ['./route/*.js']
}

// Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Redirect '/' to '/api-docs'
app.get('/', (req, res) => {
    res.redirect('/api-docs')
})

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/v1/dictionary', dictionaryRouter)


app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported' })
})

// Error handler
app.use((err, req, res, next) => {
    if (err.message === 'NOT Found')
        res.status(404).json({ error: err.message })
    else
        res.status(500).json({ error: 'Something went wrong. ' + err.message })
})

app.listen(port, () => console.log('The server has started at ' + port))
