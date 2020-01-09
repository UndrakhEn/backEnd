const db = require('../models/_index');
const Post = require('../models/post');
const Comment = require('../models/comments');
const message = require('../utils/message');

const get = async (req, res) => {
  let public = [];
  Post.find()
    .sort({ created_date: -1 })
    .then(async posts => {
      if (posts.length == 0) return res.json(message.NOT_FOUND);
      for (let index = 0; index < posts.length; index++) {
        if (posts[index].is_public == true) public.push(posts[index]);
      }
      await firstAsync(public);

      return res.json(message.SUCCESS(public));
    })
    .catch(e => {
      return res.json(message.ERROR);
    });
};

const getStudent = (req, res) => {
  let public = [];
  Post.find({ 'user.type': 'D' })
    .sort({ created_date: -1 })
    .then(async posts => {
      if (posts.length == 0) return res.json(message.NOT_FOUND);
      for (let index = 0; index < posts.length; index++) {
        if (posts[index].is_public == true) public.push(posts[index]);
      }
      await firstAsync(public);
      return res.json(message.SUCCESS(public));
    })
    .catch(e => {
      console.log(e);
      return res.json(message.ERROR);
    });
};

const getThanks = (req, res) => {
  let public = [];
  Post.find({ is_thanks: true })
    .sort({ created_date: -1 })
    .then(posts => {
      if (posts.length == 0) return res.json(message.NOT_FOUND);
      return res.json(message.SUCCESS(posts));
    })
    .catch(e => {
      console.log(e);
      return res.json(message.ERROR);
    });
};
const getTagged = (req, res) => {
  Post.find({ 'tagged_user.id': req.body.user_id })
    .sort({ created_date: -1 })
    .then(posts => {
      if (posts.length == 0) return res.json(message.NOT_FOUND);
      return res.json(message.SUCCESS(posts));
    })
    .catch(e => {
      console.log(e);
      return res.json(message.ERROR);
    });
};

const getId = (req, res) => {
  let id2 = req.body.id;
  Post.find({ _id: id2 })
    .then(data => {
      if (data.length > 0) {
        return res.json(message.SUCCESS(data));
      } else {
        return res.json(message.NOT_FOUND);
      }
    })
    .catch(err => {
      return res.json(message.NOT_FOUND);
    });
};

const getUserIdAll = (req, res) => {
  let user_id = req.body.user_id;
  Post.find({ 'user.id': user_id })
    .sort({ created_date: -1 })
    .then(data => {
      console.log(data);
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
    user: req.body.user,
    tagged_user: req.body.tagged_user,
    body: req.body.body,
    images: req.body.images,
    created_date: Date.now(),
    is_public: req.body.is_public,
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
      post.user = req.body.user;
      post.tagged_user = req.body.tagged_user;
      post.body = req.body.body;
      post.images = req.body.images;
      post.created_date = Date.now();
      post.is_public = req.body.is_public;
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

const updateLike = (req, res) => {
  let id = req.body.id;
  let a = 0;
  Post.findById(id)
    .then(post => {
      for (let index = 0; index < post.like_cnt.length; index++) {
        if (post.like_cnt[index] == req.body.userId) {
          post.like_cnt.splice(index, 1);
          a = 1;
        }
      }
      for (let index = 0; index < post.dislike_cnt.length; index++) {
        if (post.dislike_cnt[index] == req.body.userId) {
          post.dislike_cnt.splice(index, 1);
          post.like_cnt.push(req.body.userId);
          a = 1;
        }
      }
      // post.dislike_cnt = req.body.id;
      if (a == 0) {
        post.like_cnt.push(req.body.userId);
      } else {
      }
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
const updateDisLike = (req, res) => {
  let id = req.body.id;
  let a = 0;
  Post.findById(id)
    .then(post => {
      for (let index = 0; index < post.dislike_cnt.length; index++) {
        if (post.dislike_cnt[index] == req.body.userId) {
          post.dislike_cnt.splice(index, 1);
          a = 1;
        }
      }
      for (let index = 0; index < post.like_cnt.length; index++) {
        if (post.like_cnt[index] == req.body.userId) {
          post.like_cnt.splice(index, 1);
          post.dislike_cnt.push(req.body.userId);
          a = 1;
        }
      }
      // post.dislike_cnt = req.body.id;
      if (a == 0) {
        post.dislike_cnt.push(req.body.userId);
      }
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
const updatePerforCode = (req, res) => {
  let id = req.body.id;
  let p = req.body.perfor_code;
  Post.findById(id)
    .then(post => {
      post.perfor_code = p;
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

const firstAsync = async public => {
  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < public.length; index++) {
      const i = public[index];
      await Comment.find({ post_id: i.id })
        .then(comm => {
          public[index].comment_cnt = comm.length;
        })
        .catch(e => {
          public[index].comment_cnt = 0;
        });
    }
    resolve(true);
  });
};

module.exports = {
  get,
  getTagged,
  updateLike,
  getId,
  getThanks,
  getUserIdAll,
  getStudent,
  create,
  update,
  updatePerforCode,
  deletee,
  updateDisLike
};
