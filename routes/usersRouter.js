const express = require('express');
const {Sequelize} = require('sequelize');
const usersRouter = express.Router();
// const users = require('../users.json');
// const shows = require('../shows.json');
const { User, Show } = require('../models/index');

// Read
// All users
usersRouter.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
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
// usersRouter.get('/:id/shows', async (req, res) => {
//     const userShows = await User.getShows({ where: { id: req.params.id } });
//     res.status(200).send(userShows);

//     const userIndex = (req.params.id - 1);
//     try {
//         const showsWatchedByUser = await Show.findAll({ where: { id: req.params.id } })

//     } catch (error) {

//     }
// })


// const show = await user.getShows();


// a PUT request to  /users/2/shows/9 should update the 9th show for the 2nd user.
// Update and add a show if a user has watched it
usersRouter.put('/:id/shows/:showId', async (req, res) => {
    const userId = await Show.update({ userId: req.params.id })
})


module.exports = usersRouter;