const express = require("express")
const app = express()
var bodyParser = require('body-parser');
const mongoose = require("mongoose")
var multer = require('multer');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
require("dotenv").config()

var cors = require("cors")
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('connected to db'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "Deny"})
})

const authRouter = require('./routes/auth')
const movieRouter = require('./routes/movie')

app.use('/auth', authRouter)
app.use('/movie', movieRouter)

app.listen(3000)