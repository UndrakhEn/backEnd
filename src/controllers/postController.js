const Post = require('../models/post');
const message = require('../utils/message');
const get = (req, res) => {
  Post.find()
    .then(posts => {
      return res.json(message.SUCCESS(posts));
    })
    .catch(err => {
      return res.json(message.ERROR);
    });
};

const getId = (req, res) => {
  let id = req.body.id;
  Post.findById(id)
    .then(post => {
      return res.json(message.SUCCESS(post));
    })
    .catch(err => {
      return res.json(message.NOT_FOUND);
    });
};

const getUserIdAll = (req, res) => {
  let user_id = req.body.users_id;
  Post.find({ users_id: user_id })
    .then(data => {
      if (data.length > 0) {
        return res.json(message.SUCCESS(data));
      } else {
        return res.json(message.NOT_FOUND);
      }
    })
    .catch(err => {
      console.log(err);
      return res.json(message.ERROR);
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
      res.json(message.SUCCESS(post));
    })
    .catch(err => {
      console.log(err);
      return res.json(message.ERROR);
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
          res.json(message.SUCCESS(post));
        })
        .catch(err => {
          return res.json(message.ERROR);
        });
    })
    .catch(err => {
      return res.json(message.NOT_FOUND);
    });
};

const deletee = (req, res) => {
  let id = req.body.id;
  Post.findById(id)
    .then(post => {
      post
        .delete()
        .then(post => {
          res.json(message.SUCCESS(post));
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
  getId,
  getUserIdAll,
  create,
  update,
  deletee
};
