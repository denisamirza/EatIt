const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const userFavouritesSchema = {
    movieId: String,
    username: String,
};

const userFavourites = mongoose.model(
    "userFavourites",
    userFavouritesSchema,
    "userFavourites"
);

router
    .route('/:username')
    .get((request, res) => {
        userFavourites.collection.find({username: request.params.username}).toArray(function (err, result) {
            if (err) {
               res.status(400).send("Error fetching listings!");
           } else {
               console.log(result);
               res.send(result)
            }
          });
    })

router 
    .route('/addUserFavouriteMovie')
    .post((request) => {
        userFavourites.collection.updateOne(
            {
                username: request.body.username,
                movieId: request.body.movieId
            },
            {
                '$set':{
                    username: request.body.username,
                    movieId: request.body.movieId
                }
            },
            { upsert: true }
        )
    })

router 
    .route('/delete')
    .delete((request) => {
        console.log(JSON.stringify(request.headers) + " "+request.headers.username + " "+ request.headers.movieid)
        userFavourites.collection.deleteOne({username:request.headers.username, movieId: request.headers.movieid})
    })

module.exports = router