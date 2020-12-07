const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res, next) => {
    try {
        res.send('<h1>Here is a list of pictures currently in the database:</h1>')
    } catch (error) {
        console.log(error)
    }
})

app.get('/abs', (req, res, next) => {
    try {
        res.send(`<h1>Monday: Sit ups</h1>`)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})