const express = require("express")
var request = require("request");
const router = express.Router()
const mongoose = require("mongoose")

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

const movie = mongoose.model(
    "Movies",
    movieSchema,
    "movies"
);

router
.route('/imdb')
.get((req, res) => { 
    request("https://www.omdbapi.com/?s=batman&apikey=thewdb&plot=full", 
        function(error, response, body){
            if(!error && response.statusCode == 200){
                // res.send(body); < what we had before
                var data = JSON.parse(body);
                res.send(data);
                console.log(data);
                //res.render("results", {data: data});
            }
    });
    console.log("movie");
});

router
.route('/imdb/:id')
.get((req, res) => { 
    request("https://www.omdbapi.com/?apikey=thewdb&i=" + req.params.id, 
        function(error, response, body){
            if(!error && response.statusCode == 200){
                // res.send(body); < what we had before
                var data = JSON.parse(body);
                res.send(data);
                console.log(data);
                //res.render("results", {data: data});
            }
            else{
                console.log("ll");
            }
    });
    console.log("movie");
});

var imgPath = 'D:/Lo/msa/pics/Sample_User_Icon.png';
// var imgPath = 'C:/Users/Deni/Pictures/Saved Pictures/cat.png';

// user.findOne({username: "deni"}, (err, foundItem) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(foundItem);
//     }
// })

router
    .route('/')
    .get((req, res) => {
        res.json({message: "movies browse page"})
    })
    .post((req, res) => {
        movie.collection.insertOne(
        {
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            picture: {
                data: req.body.picture.data,
                contentType: 'image/png'
            },
            cast: [{
                name: req.body.cast.name,
                picture: {
                    data: req.body.cast.picture.data,
                    contentType: 'image/png'
                }
            }],
            review: [{
                rating: req.body.review.rating,
                reviewDescription: req.body.review.reviewDescription
            }],
            overallRating: req.body.overallRating
        })
    })
    
router
    .route('/:id')
    .get((req, res) => {
        res.json({message: `movie with id ${req.params.id}`})
        movie.collection.findOne({title: req.body.title}, (err, foundItem) => {
            if (foundItem)
            {
                res.json({message: `movie: ${foundItem}`})
                console.log("success!");
                response.sendStatus(200);
            }
            else {
                console.log(err);
            }
        })
    })

module.exports = router