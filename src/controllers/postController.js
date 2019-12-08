const Post = require('../models/Post');

const getPost = (req, res, next) => {
  Post.find()
    .then(posts => {
      return res.json(posts);
    })
    .catch(err => console.log(err));
};

const post = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const body = req.body.body;
  newPost = new Post({
    title: title,
    body: body
  });
  newPost
    .save()
    .then(post => {
      res.json(post);
    })
    .catch(err => console.log(err));
};

const update = (req, res, next) => {
  let id = req.params.id;
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

const deletePost = (req, res, next) => {
  let id = req.params.id;
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
  post,
  update,
  deletePost
};
