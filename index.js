const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./src/utils/db').database;

// database connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('database succesfully');
  })
  .catch(err => {
    console.log('unsuccesfully ', err);
  });

const port = process.env.PORT || 3000;

//initialize cors middleware
app.use(cors());

//initialize Bodyparser middleware
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('<h1>Hellooooooo</h1>');
// });

const router = require('./src/routes/_index');
app.use('/api/', router);

app.listen(port, () => {
  console.log('serve started on port', port);
});

//initialize public directory
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });
