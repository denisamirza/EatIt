const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const mongo = require('mongodb')

const commentSchema = {
    movieId: String,
    username: String,
    comment: String
};

const comment = mongoose.model(
    "comments",
    commentSchema,
    "comments"
);

router
    .route('/:movieId')
    .get((request, res) => {
        comment.collection.find({movieId: request.params.movieId}).toArray(function (err, result) {
            if (err) {
               res.status(400).send("Error fetching listings!");
           } else {
               console.log(result);
               res.send(result)
            }
          });
    })

router 
    .route('/addComment')
    .post((request, response) => {
        comment.collection.insertOne(
        {
           username: request.body.username,
           movieId: request.body.movieId,
           comment: request.body.comment
        })
        response.json(200,{status:"ok"})
    })

router 
    .route('/delete')
    .delete((request, response) => {
        console.log(request.headers.id)
        comment.collection.deleteOne({_id: new mongo.ObjectId(request.headers.id)})
        response.json(200,{status:"ok"})
    })

module.exports = router