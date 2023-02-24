const express = require('express');
const {Sequelize} = require('sequelize');
const usersRouter = express.Router();
const users = require('../users.json');
const shows = require('../shows.json');

// Read
// All users
usersRouter.get('/', (req, res) => {
    try {
        if (users.length < 0) {
            
        }
        res.status(200).send(users);
    } catch (error) {

    }
})

// One user
usersRouter.get('', (req, res) => {
    
})

// 
usersRouter.get('', (req, res) => {
    
})