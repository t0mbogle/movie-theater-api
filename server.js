const express = require('express');
const {db} = require('./db');
const app = express();

const port = 3000;

app.use(express.json())




app.listen(port, () => {
    db.sync();
    console.log(`App listening on port ${port}`);
})
