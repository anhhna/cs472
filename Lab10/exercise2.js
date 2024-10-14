
import express from 'express'

const app = express()
app.set('port', process.env.PORT || 3000)
const port = app.get('port')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// get numbers from request
function getNumbers(req) {
    const a = parseFloat(req.params.a || req.query.a || req.body.a);
    const b = parseFloat(req.params.b || req.query.b || req.body.b);
    return { a, b }
}

// caculate result and send response
function calculate(req, res, operation) {
    const {a, b} = getNumbers(req)

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({error: 'Invalid input numbers'})
    }

    let result;
    switch (operation) {
        case 'addition':
            result = a + b
            break
        case 'subtraction':
            result = a - b
            break
        case 'multiplication':
            result = a * b
            break
        case 'division':
            if (b === 0)
                return res.status(400).json('Divided by zero')
            result = a / b
            break
        case 'modulus':
            if (b === 0)
                return res.status(400).json('Modulus by zero')
            result = a % b
            break
        default:
            return res.status(400).json({error: 'Invalid operation'})
    }

    res.json({results: result})
}

let operations = ['addition', 'subtraction', 'multiplication', 'division', 'modulus']
operations.forEach((operation) => {
    app.get(`/${operation}/:a?/:b?`, (req, res) => calculate(req, res, `${operation}`))
    app.post(`/${operation}`, (req, res) => calculate(req, res, `${operation}`))
})

app.listen(port, () => console.log(`Running on ${port}`))