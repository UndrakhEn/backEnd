const Post = require('../models/post');

const getPost = (req, res) => {
  Post.find()
    .then(posts => {
      return res.json(posts);
    })
    .catch(err => console.log(err));
};

const createPost = (req, res) => {
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
      res.json(post);
    })
    .catch(err => console.log(err));
};

const update = (req, res) => {
  let id = req.body.id;
  Post.findById(id)
    .then(post => {
      post.title = req.body.title;
      post.body = req.body.body;
      post
        .save()
        .then(post => {
          res.send({
            message: 'post update successfully',
            status: 'success',
            post: post
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const deletePost = (req, res) => {
  let id = req.body.id;
  Post.findById(id)
    .then(post => {
      post
        .delete()
        .then(post => {
          res.send({
            message: 'post delete successfully',
            status: 'success',
            post: post
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  getPost,
  createPost,
  update,
  deletePost
};
