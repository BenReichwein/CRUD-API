const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const db = require('./config/db')
const PORT = process.env.PORT || 3000

// Initiate Mongo Server
db();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/routes.js')(app, fs)

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})