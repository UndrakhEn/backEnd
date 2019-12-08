const Comment = require('../models/comments');
const message = require('../utils/message');

const get = (req, res) => {
  Comment.find()
    .then(comments => {
      return res.json(message.SUCCESS(comments));
    })
    .catch(err => {
      return res.json(message.ERROR);
    });
};

const create = (req, res) => {
  console.log(req.body);
  newComm = new Comment({
    body: req.body.body,
    created_date: Date.now(),
    parent_id: req.body.parent_id,
    post_id: req.body.post_id
  });
  newComm
    .save()
    .then(comment => {
      res.json(message.SUCCESS(comment));
    })
    .catch(err => {
      console.log(err);
      return res.json(message.ERROR);
    });
};

const update = (req, res) => {
  let id = req.body.id;
  Comment.findById(id)
    .then(comment => {
      comment.body = req.body.body;
      comment.created_date = Date.now();
      comment.parent_id = req.body.parent_id;
      comment.post_id = req.body.post_id;
      comment
        .save()
        .then(data => {
          res.send(message.SUCCESS(data));
        })
        .catch(err => {
          console.log(err);
          return res.json(message.ERROR);
        });
    })
    .catch(err => {
      console.log(err);
      return res.json(message.NOT_FOUND);
    });
};

const deletee = (req, res) => {
  let id = req.body.id;
  Comment.findById(id)
    .then(comment => {
      comment
        .delete()
        .then(comment => {
          res.send(message.SUCCESS(comment));
        })
        .catch(err => {
          console.log(err);
          return res.json(message.ERROR);
        });
    })
    .catch(err => {
      console.log(err);
      return res.json(message.NOT_FOUND);
    });
};

module.exports = {
  get,
  create,
  update,
  deletee
};
