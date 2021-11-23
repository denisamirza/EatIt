const express = require("express")
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.json({message: "movies browse page"})
    })
    
router
    .route('/:id')
    .get((req, res) => {
        res.json({message: `movie with id ${req.params.id}`})
    })

module.exports = router