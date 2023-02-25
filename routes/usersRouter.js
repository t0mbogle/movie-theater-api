const express = require('express');
const usersRouter = express.Router();
const { User, Show } = require('../models/index');

// Read
// All users
usersRouter.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send({ msg: 'Successfully fetched all users', users: users});
})

// One user
usersRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    try {
        if (!user) {
            throw new Error("No data available at this id number")
        } else {
            res.status(200).send({ msg: "Successfully requested user data", user: user })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})


// // All shows watched by a user
usersRouter.get('/:id/shows', async (req, res) => {
    // request all shows a user has watched from the userId of a show
    const allShows = await Show.findAll({ where: { userId: req.params.id } })

    try {
        if (allShows.length < 1) {
            throw new Error(`No shows watched by user:${req.params.id}`)
        } else {
            res.status(200).send({ msg: `Successfully retrieved shows watched by user: ${req.params.id}`, shows: allShows })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

// Update and add a show if a user has watched it
usersRouter.put('/:id/shows/:showId', async (req, res) => {
    await Show.update({ userId: req.params.id }, { where: { id: req.params.showId } })
    res.status(200).send('Show watched by user')
})


module.exports = usersRouter;