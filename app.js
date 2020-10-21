const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


if (process.env.ENV === 'Test') {
  console.log('this is a test')
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('this is for real')
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}


const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my cool api!');
});

app.server = app.listen(port, ()=> {
    console.log(`running on port ${port}`);
});

module.exports = app;