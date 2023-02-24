const express = require('express');
const {Sequelize} = require('sequelize');
const usersRouter = express.Router();
const users = require('../users.json');
// const shows = require('../shows.json');

// Read
// All users
usersRouter.get('/', (req, res) => {
    try {
        if (users.usersData.length < 1) {
            throw new Error("No user data available")
        } else {
            res.status(200).send({ msg: "Successfully requested all user data", users });
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

// One user
usersRouter.get('/:id', (req, res) => {
    const userIndex = (req.params.id - 1)
    try {
        if (!users.usersData[userIndex]) {
            throw new Error("No data available at this id number")
        } else {
            res.status(200).send({ msg: "Successfully requested user data", user: users.usersData[userIndex] })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

// // 
// usersRouter.get('', (req, res) => {
    
// })


module.exports = usersRouter;