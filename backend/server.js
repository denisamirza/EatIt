const express = require("express")
const app = express()
var bodyParser = require('body-parser');
const mongoose = require("mongoose")
var multer = require('multer');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
require("dotenv").config()

const bcrypt = require('bcryptjs');

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

const userSchema = {
    username: String,
    password: String
};

const movieSchema = {
    title: String,
    genre: String,
    description: String,
    picture: { data: Buffer, contentType: String },
    cast: [{
        name: String,
        picture: { data: Buffer, contentType: String }
    }],
    review: [{
        rating: Number,
        reviewDescription: String
    }],
    overallRating: Number
};

const user = mongoose.model(
    "Users",
    userSchema,
    "users"
);

const movie = mongoose.model(
    "Movies",
    movieSchema,
    "movies"
);
var imgPath = 'D:/Lo/msa/pics/Sample_User_Icon.png';
// var imgPath = 'C:/Users/Deni/Pictures/Saved Pictures/cat.png';

user.findOne({username: "deni"}, (err, foundItem) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(foundItem);
    }
})

// user.collection.insertOne(
//     {
//       username: "christine",
//       ordered: "christine"
//     }
//  )

 movie.collection.insertOne(
     {
        title: "action",
        genre: "adventure",
        description: "best adventure movie",
        picture: {
            data: fs.readFileSync(imgPath),
            contentType: 'image/png'
        },
        cast: [{
            name: "some vips",
            picture: {
                data: fs.readFileSync(imgPath),
                contentType: 'image/png'
            }
        }],
        review: [{
            rating: 10,
            reviewDescription: "very good"
        }],
        overallRating: 10
     }
 )

const authRouter = require('./routes/auth')
const movieRouter = require('./routes/movie')

app.use('/auth', authRouter)
app.use('/movie', movieRouter)

app.listen(3000)