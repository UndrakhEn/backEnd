const express = require('express');
const app = express();

const commentRouter = require('./commentRouter');
const postRouter = require('./postRouter');

// app.use('/', commentRouter);
app.use('/', postRouter);

module.exports = app;