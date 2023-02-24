const express = require('express');
const {db} = require('./db');
const app = express();
const usersRouter = require('./routes/usersRouter');
const seed = require('./seed')
seed();

const port = 3000;

app.use(express.json())

app.use('/users', usersRouter)
app.use('/users/:id', usersRouter)
app.use('/users/:id/shows', usersRouter)

app.listen(port, () => {
    db.sync();
    console.log(`App listening on port ${port}`);
})
