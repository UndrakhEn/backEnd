const message = require('../utils/message');
const Words = require('../models/words');

const get = (req, res) => {
  Words.find()
    .then(words => {
      return res.json(message.SUCCESS(words));
    })
    .catch(err => {
      return res.json(message.ERROR);
    });
};

const create = (req, res) => {
  Words = new Words({
    words: req.body.body
  });
  Words
    .save()
    .then(words => {
      res.json(message.SUCCESS(words));
    })
    .catch(err => {
      console.log(err);
      return res.json(message.ERROR);
    });
};
module.exports = {
  get,
  create
};