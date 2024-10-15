import express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000)
const port = app.get('port')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// caculate result and send response
function calculate(req, res, operation) {
    const a = parseFloat(req.params.a || req.query.a || req.body.a);
    const b = parseFloat(req.params.b || req.query.b || req.body.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({error: 'Invalid input numbers'})
    }

    const operations = {
        'addition': a + b,
        'subtraction': a - b,
        'multiplication': a * b,
        'division': b !== 0 ? a / b : 'Divided by zero',
        'modulus': b !== 0 ? a % b : 'Modulus by zero'
    }

    let result = operations[operation]
    console.log(result);
    if (result === undefined || typeof result === 'string') {
        return res.status(400).json({error: result || 'Invalid operation'})
    }

    res.json({results: result})
}

let operations = ['addition', 'subtraction', 'multiplication', 'division', 'modulus']
operations.forEach((operation) => {
    app.get(`/${operation}/:a?/:b?`, (req, res) => calculate(req, res, `${operation}`))
    app.post(`/${operation}`, (req, res) => calculate(req, res, `${operation}`))
})

app.listen(port, () => console.log(`Running on ${port}`))