const express = require('express');
const app = express();

const postRouter = require('./postRouter');
app.use('/post', postRouter);

const commRouter = require('./commRouter');
app.use('/comm', commRouter);

module.exports = app;
