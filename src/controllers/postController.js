const db = require('../models/_index');
const Post = require('../models/post');
const message = require('../utils/message');
const  MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/"; 
let dbo;
MongoClient.connect(url, function(err, db) {
  if (err) console.log(err)
  dbo = db.db("db");
})

const get = (req, res) => {
  console.log('test')
  dbo.collection('posts').aggregate([{
    $lookup:{
      from: 'users',  
      localField: 'user_id',
      foreignField: '_id',
      as: 'author'
    }
  }]).toArray((err,res)=>{
      // 
    if(err) return res.json(message.ERROR);
    return res.json(message.SUCCESS(res));
  })
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
