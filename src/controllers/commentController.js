const Comment = require('../models/comments');

const get = (req, res) => {
  Comment.find()
    .then(comments => {
      return res.json(comments);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'comment get hvselt amjiltgvi'
      });
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
      res.json({
        status: 'success',
        message: 'comment create ajilttai',
        data: comment
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'create comment amjiltgvi'
      });
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
          res.send({
            message: 'comment update successfully',
            status: 'success',
            data: data
          });
        })
        .catch(err => {
          console.log(err);
          return res.json({
            status: 'error',
            message: 'comment update hiij chadsngvi'
          });
        });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'comment not found'
      });
    });
};

const deletee = (req, res) => {
  let id = req.body.id;
  Comment.findById(id)
    .then(comment => {
      comment
        .delete()
        .then(comment => {
          res.send({
            message: 'comment delete successfully',
            status: 'success',
            data: comment
          });
        })
        .catch(err => {
          console.log(err);
          return res.json({
            status: 'error',
            message: 'comment delete unsuccessfully'
          });
        });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'comment not found'
      });
    });
};

module.exports = {
  get,
  create,
  update,
  deletee
};
