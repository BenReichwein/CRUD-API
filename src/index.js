const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const PORT = 3000 || process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/routes.js')(app, fs)

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})