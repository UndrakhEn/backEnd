const express = require('express');
const app = express();

const postRouter = require('./postRouter');
app.use('/', postRouter);

module.exports = app;
