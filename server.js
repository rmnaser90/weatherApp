const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/weatherApp', { useNewUrlParser: true, useFindAndModify: true })
const City = require('./server/models/city.js')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)











const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})