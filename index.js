const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./src/utils/config');
const server = require('./src/utils/server');
const mssql = require('mssql');

mongoose
  .connect(config.DB, { useNewUrlParser: true })
  .then(() => {
    console.log('MONGO Database succesfully ');
  })
  .catch(err => {
    console.log('Unsuccesfully ', err);
  });

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:4200`);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,' +
      ' Accept, Authorization,authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    parameterLimit: 50,
    extended: true
  })
);

const router = require('./src/routes/_index');
app.use('/api/', router);

app.listen(config.PORT, () => {
  console.log('Serve started on port', config.PORT);
});

//initialize public directory
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });
