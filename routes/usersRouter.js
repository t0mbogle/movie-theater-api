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


// const show = await user.getShows();


// // All shows watched by a user
// usersRouter.get('/:id/shows', async (req, res) => {
//     const userIndex = (req.params.id - 1);
//     try {
//         const showsWatchedByUser = await Show.findAll({ where: { id: req.params.id } })

//     } catch (error) {

//     }
// })

// // Update and add a show is a user has watched it
// usersRouter.put('', (req, res) => {

// })


module.exports = usersRouter;