const db = require('../models/_index');
const Post = require('../models/post');
const message = require('../utils/message');

const get = (req, res) => {
  Post.aggregate([
    {
      $project: {
        user_id: 1,
        tagged_user: 1,
        body: 1,
        images: 1,
        created_date: 1,
        is_vissible: 1,
        dislike_cnt: 1,
        like_cnt: 1,
        perfor_code: 1,
        is_thanks: 1,
        deadline: 1,
        userId: {
          $toObjectId: '$user_id'
        }
      }
    },
    { $sort: { created_date: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    }
  ])
    .then(posts => {
      return res.json(message.SUCCESS(posts));
    })
    .catch(e => {
      return res.json(message.NOT_FOUND);
    });
};
const getId = (req, res) => {
  let id2 = req.body.id;
  Post.aggregate([
    {
      $project: {
        user_id: 1,
        tagged_user: 1,
        body: 1,
        images: 1,
        created_date: 1,
        is_vissible: 1,
        dislike_cnt: 1,
        like_cnt: 1,
        perfor_code: 1,
        is_thanks: 1,
        deadline: 1,
        userId: {
          $toObjectId: '$user_id'
        },
        idid: {
          $toString: '$_id'
        }
      }
    },
    { $match: { idid: req.body.id } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    }
  ])
    .then(post => {
      console.log(post);
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
    user_id: req.body.user_id,
    tagged_user: req.body.tagged_user,
    body: req.body.body,
    images: req.body.images,
    created_date: Date.now(),
    is_vissible: req.body.is_vissible,
    dislike_cnt: req.body.dislike_cnt,
    like_cnt: req.body.like_cnt,
    perfor_code: req.body.perfor_code,
    is_thanks: req.body.is_thanks,
    deadline: req.body.deadline
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
      post.user_id = req.body.user_id;
      post.tagged_user = req.body.tagged_user;
      post.body = req.body.body;
      post.images = req.body.images;
      post.created_date = Date.now();
      post.is_vissible = req.body.is_vissible;
      post.dislike_cnt = req.body.dislike_cnt;
      post.like_cnt = req.body.like_cnt;
      post.perfor_code = req.body.perfor_code;
      post.is_thanks = req.body.is_thanks;
      post.deadline = req.body.deadline;
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
