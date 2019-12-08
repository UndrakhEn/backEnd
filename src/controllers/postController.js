const Post = require('../models/post');

const get = (req, res) => {
  Post.find()
    .then(posts => {
      return res.json(posts);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'post get hvselt amjiltgvi'
      });
    });
};

const create = (req, res) => {
  console.log(req.body);
  newPost = new Post({
    users_id: req.body.user_id,
    created_date: Date.now(),
    body: req.body.body,
    status: req.body.status,
    perfor_code: req.body.perfor_code,
    post_type: req.body.post_type
  });
  newPost
    .save()
    .then(post => {
      res.send({
        message: 'create post successfully',
        status: 'success',
        data: post
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'create post unsuccessfully'
      });
    });
};

const update = (req, res) => {
  let id = req.body.id;
  Post.findById(id)
    .then(post => {
      post.users_id = req.body.user_id;
      post.created_date = Date.now();
      post.body = req.body.body;
      post.status = req.body.status;
      post.perfor_code = req.body.perfor_code;
      post.post_type = req.body.post_type;
      post
        .save()
        .then(post => {
          res.send({
            message: 'post update successfully',
            status: 'success',
            data: post
          });
        })
        .catch(err => {
          console.log(err);
          return res.json({
            status: 'error',
            message: 'post update unsuccessfully'
          });
        });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'post not found'
      });
    });
};

const deletee = (req, res) => {
  let id = req.body.id;
  Post.findById(id)
    .then(post => {
      post
        .delete()
        .then(post => {
          res.send({
            message: 'post delete successfully',
            status: 'success',
            data: post
          });
        })
        .catch(err => {
          console.log(err);
          return res.json({
            status: 'error',
            message: 'post delete unsuccessfully'
          });
        });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        status: 'error',
        message: 'post not found'
      });
    });
};

module.exports = {
  get,
  create,
  update,
  deletee
};
