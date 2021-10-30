require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('connected to db'))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "Deny"})
})

app.get('/login', (req, res) => {
    res.json({message: "login"})
})

app.get('/signin', (req, res) => {
    res.json({message: "signin"})
})

const userSchema = {
    username: String,
    password: String,
};

const user = mongoose.model(
    "Users",
    userSchema,
    "users"
);

user.findOne({username: "deni"}, (err, foundItem) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(foundItem);
    }
})

user.collection.insertOne(
    {
      username: "christine",
      ordered: "christine"
    }
 )

app.listen(3000)