const mongoose = require('mongoose');

const WordsSchema = mongoose.Schema({
  words: { type: String, require: false }
});

const Words = mongoose.model('words', WordsSchema);
module.exports = Words;
