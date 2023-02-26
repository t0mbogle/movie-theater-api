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
            // Add message to suggest user to input certain genre in req.params
        } else {
            res.status(200).send({ msg: `All shows of type ${req.params.genreType}`, Shows: showsOfType })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

// Update
// put/update the rating of a show that has been watched
showsRouter.put('/:id/watched', async (req, res) => {
    const updateShow = await Show.findByPk(req.params.id)

    try {
        if (updateShow.userId === null) {
            throw new Error("Show has not been watched")
        } else {
            updateShow.rating = req.body.rating
            res.status(201).send({ msg: "Show rating updated", show: updateShow })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

// put/update the status of a show 
showsRouter.put('/:id/updates', async (req, res) => {
    try {
        if (req.body.status !== "cancelled" && req.body.status !== "on-going") {
            throw new Error("Show can only be updated to 'cancelled' or 'on-going'")
        } else {
            await Show.update({ status: req.body.status }, { where: { id: req.params.id } })
            res.status(200).send('Updated status of show')
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

// Delete
showsRouter.delete('/:id', async (req, res) => {
    try {
        const show = await Show.destroy({ where: { id: req.params.id } })
        if (!show) { // if there is no content at the entered id
            throw new Error(`No show in database at id: ${req.params.id}`)
        } else {
            res.status(200).send({ msg: "Successfully deleted show" })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}) 

module.exports = showsRouter;
