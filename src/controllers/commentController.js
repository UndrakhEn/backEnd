const Comment = require('../models/comments');
const message = require('../utils/message');
const user = require('../models/users');

Comment.aggregate([
  {
    $lookup: {
      from: user,
      localField: 'user_id',
      foreignField: '_id',
      as: 'commentsDetialUser'
    }
  }
]);
const get = (req, res) => {
  Comment.find()
    .then(comments => {
      return res.json(message.SUCCESS(comments));
    })
    .catch(err => {
      return res.json(message.ERROR);
    });
};

const getPostId = (req, res) => {
  let postId = req.body.post_id;
  Comment.find({ post_id: postId })
    .then(comm => {
      console.log(comm);
      if (comm.length > 0) return res.json(message.SUCCESS(comm));
      else return res.json(message.NOT_FOUND);
    })
    .catch(err => {
      console.log(err);
      return res.json(message.ERROR);
    });
};
f0 = i => {
  return new Promise(resolve => {
    Comment.find({ parent_id: i._id }).then(data => {
      resolve(data);
    });
  });
};

f1 = data => {
  return new Promise(resolve => {
    let xaxa = [];
    data.forEach(async i => {
      let data2 = await f0(i);
      let obj = {
        _id: i._id,
        post_id: i.post_id,
        body: i.body,
        created_date: i.created_date,
        parent_id: i.parent_id,
        user_id: i.user_id,
        dislike_cnt: i.dislike_cnt,
        like_cnt: i.like_cnt,
        replies: data2
      };
      xaxa.push(obj);
    });
    console.log(xaxa);
    resolve(xaxa);
  });
};
const reply = (req, res) => {
  let postId = req.body.post_id;
  Comment.find({ post_id: postId, parent_id: '' })
    .then(async comm => {
      let shine = await f1(comm);
      return res.json(message.SUCCESS(shine));
    })
    .catch(err => {
      console.log(err);
      res.json(message.ERROR);
    });
};

const create = (req, res) => {
  console.log(req.body);
  newComm = new Comment({
    post_id: req.body.post_id,
    body: req.body.body,
    created_date: Date.now(),
    parent_id: req.body.parent_id,
    user_id: req.body.user_id,
    dislike_cnt: req.body.dislike_cnt,
    like_cnt: req.body.like_cnt
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
      comment.post_id = req.body.post_id;
      comment.body = req.body.body;
      comment.created_date = Date.now();
      comment.parent_id = req.body.parent_id;
      comment.user_id = req.body.user_id;
      comment.dislike_cnt = req.body.dislike_cnt;
      comment.like_cnt = req.body.like_cnt;
      comment
        .save()
        .then(data => {
          res.json(message.SUCCESS(data));
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
          res.json(message.SUCCESS(comment));
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
  getPostId,
  reply,
  update,
  deletee
};
