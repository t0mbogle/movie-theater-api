const express = require('express');
const showsRouter = express.Router();
const { User, Show } = require('../models/index');

// Read
// get all shows
showsRouter.get('/', async (req, res) => {
    const shows = await Show.findAll();
    res.send({ msg: 'Successfully fetched all shows', shows: shows });
})

// get one show
showsRouter.get('/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    try {
        if (!show) {
            throw new Error(`No show available at id: ${req.params.id}`)
        } else {
            res.status(200).send({ msg: `Successfully fetched show`, show: show })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

// get all shows of a particular genre
showsRouter.get('/genres/:genreType', async (req, res) => {
    const showsOfType = await Show.findAll({ where: { genre: req.params.genreType } })

    try {
        if (showsOfType.length < 1) {
            throw new Error(`No shows of genre: ${req.params.genreType}!`)
        } else {
            res.status(200).send({ msg: `All shows of type ${req.params.genreType}`, Shows: showsOfType })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

// Update
// put/update the rating of a show that has been watched

// put/update the status of a show 


// Delete
// delete a show 

module.exports = showsRouter;
