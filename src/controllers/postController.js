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

const c = (req, res) => {
  let sent = 0,
    seen = 0,
    pending = 0,
    done = 0,
    reject = 0,
    thanks = 0;
  let all = {};
  Post.find({ 'tagged_user.own_code': req.body.own_code })
    .then(data => {
      // console.log(data);
      for (let index = 0; index < data.length; index++) {
        if (data[index].is_thanks == true) thanks = thanks + 1;
        else if (data[index].perfor_code == 'sent') sent = sent + 1;
        else if (data[index].perfor_code == 'seen') seen = seen + 1;
        else if (data[index].perfor_code == 'pending') pending = pending + 1;
        else if (data[index].perfor_code == 'done') done = done + 1;
        else reject = reject + 1; //reject
      }
      all.sent = sent;
      all.seen = seen;
      all.pending = pending;
      all.done = done;
      all.reject = reject;
      all.thanks = thanks;

      console.log(all);
      return res.json(message.SUCCESS(all));
    })
    .catch(err => {
      console.log(err);
    });
};

const b1 = async (req, res) => {
  let id = req.body.own_code;
  let str = JSON.stringify(id).substr(1, 4);
  let mbus = ['M.IT', 'M.MA', 'M.BI', 'M.CH', 'M.GE', 'M.PH', 'M.MS'];
  let boss = ['E.EM', 'E.ER', 'E.LL', 'E.PS', 'E.SW'];
  let nhus = ['H.FL', 'H.HI', 'H.ML', 'H.RL', 'H.SC'];
  let sumAll = {};
  too = 0;
  for (let q1 = 0; q1 < mbus.length; q1++) {
    if (str == mbus[q1]) {
      for (let q = 0; q < mbus.length; q++) {
        let sent = 0,
          seen = 0,
          pending = 0,
          done = 0,
          reject = 0,
          thanks = 0;
        let all = {};
        await Post.find()
          .then(data => {
            for (let index = 0; index < data.length; index++) {
              let o = 0;
              for (let j = 0; j < data[index].tagged_user.length; j++) {
                str2 = data[index].tagged_user[j].own_code;
                str3 = JSON.stringify(str2);
                if (str2.substr(0, 4) == mbus[q] && str2.length != 10) {
                  o = 1;
                  console.log(str2);
                }
              }
              if (o == 1) {
                if (data[index].is_thanks == true) thanks = thanks + 1;
                else if (data[index].perfor_code == 'sent') sent = sent + 1;
                else if (data[index].perfor_code == 'seen') seen = seen + 1;
                else if (data[index].perfor_code == 'pending')
                  pending = pending + 1;
                else if (data[index].perfor_code == 'done') done = done + 1;
                else reject = reject + 1; //reject
              }
            }
            all.sent = sent;
            all.seen = seen;
            all.pending = pending;
            all.done = done;
            all.reject = reject;
            all.thanks = thanks;
          })
          .catch(err => {
            console.log(err);
          });
        sumAll[mbus[q]] = all;
      }
      return res.json(message.SUCCESS(sumAll));
    }
  }
  for (let q1 = 0; q1 < boss.length; q1++) {
    if (str == boss[q1]) {
      for (let q = 0; q < boss.length; q++) {
        let sent = 0,
          seen = 0,
          pending = 0,
          done = 0,
          reject = 0,
          thanks = 0;
        let all = {};
        await Post.find()
          .then(data => {
            for (let index = 0; index < data.length; index++) {
              let o = 0;
              for (let j = 0; j < data[index].tagged_user.length; j++) {
                str2 = data[index].tagged_user[j].own_code;
                str3 = JSON.stringify(str2);
                if (str2.substr(0, 4) == boss[q] && str2.length != 10) o = 1;
              }
              if (o == 1) {
                if (data[index].is_thanks == true) thanks = thanks + 1;
                else if (data[index].perfor_code == 'sent') sent = sent + 1;
                else if (data[index].perfor_code == 'seen') seen = seen + 1;
                else if (data[index].perfor_code == 'pending')
                  pending = pending + 1;
                else if (data[index].perfor_code == 'done') done = done + 1;
                else reject = reject + 1; //reject
              }
            }
            all.sent = sent;
            all.seen = seen;
            all.pending = pending;
            all.done = done;
            all.reject = reject;
            all.thanks = thanks;
          })
          .catch(err => {
            console.log(err);
          });
        sumAll[boss[q]] = all;
      }
      console.log(sumAll);
    }
  }
  for (let q1 = 0; q1 < nhus.length; q1++) {
    if (str == nhus[q1]) {
      for (let q = 0; q < nhus.length; q++) {
        let sent = 0,
          seen = 0,
          pending = 0,
          done = 0,
          reject = 0,
          thanks = 0;
        let all = {};
        await Post.find()
          .then(data => {
            for (let index = 0; index < data.length; index++) {
              let o = 0;
              for (let j = 0; j < data[index].tagged_user.length; j++) {
                str2 = data[index].tagged_user[j].own_code;
                str3 = JSON.stringify(str2);
                if (str2.substr(0, 4) == nhus[q] && str2.length != 10) o = 1;
              }
              if (o == 1) {
                if (data[index].is_thanks == true) thanks = thanks + 1;
                else if (data[index].perfor_code == 'sent') sent = sent + 1;
                else if (data[index].perfor_code == 'seen') seen = seen + 1;
                else if (data[index].perfor_code == 'pending')
                  pending = pending + 1;
                else if (data[index].perfor_code == 'done') done = done + 1;
                else reject = reject + 1; //reject
              }
            }
            all.sent = sent;
            all.seen = seen;
            all.pending = pending;
            all.done = done;
            all.reject = reject;
            all.thanks = thanks;
          })
          .catch(err => {
            console.log(err);
          });
        sumAll[nhus[q]] = all;
      }
      console.log(sumAll);
      return res.json(message.SUCCESS(sumAll));
    }
  }
  return res.json(message.SUCCESS(sumAll));
};

const b2 = async (req, res) => {
  let id = req.body.own_code;
  let str = JSON.stringify(id).substr(1, 4);
  let code = [];
  let sumAll = {};
  remove_duplicates_es6 = arr => {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  };
  await Post.find()
    .then(async data => {
      for (let index = 0; index < data.length; index++) {
        let o = 0;
        for (let j = 0; j < data[index].tagged_user.length; j++) {
          if (data[index].tagged_user[j].own_code.length != 10) {
            str2 = data[index].tagged_user[j].own_code;
            str3 = JSON.stringify(str2);
            if (str2.substr(0, 4) == str && str2.length != 10) {
              code.push(str2);
            }
          }
        }
      }
      code = remove_duplicates_es6(code);
      for (let index = 0; index < code.length; index++) {
        // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        await Post.find({ 'tagged_user.own_code': code[index] })
          .then(data => {
            let sent = 0,
              seen = 0,
              pending = 0,
              done = 0,
              reject = 0,
              thanks = 0;
            let all = {};
            for (let index = 0; index < data.length; index++) {
              if (data[index].is_thanks == true) thanks = thanks + 1;
              else if (data[index].perfor_code == 'sent') sent = sent + 1;
              else if (data[index].perfor_code == 'seen') seen = seen + 1;
              else if (data[index].perfor_code == 'pending')
                pending = pending + 1;
              else if (data[index].perfor_code == 'done') done = done + 1;
              else reject = reject + 1; //reject
            }
            all.sent = sent;
            all.seen = seen;
            all.pending = pending;
            all.done = done;
            all.reject = reject;
            all.thanks = thanks;
            sumAll[code[index]] = all;
            console.log(code[index]);
            console.log(sumAll);
          })
          .catch(err => {
            console.log(err);
          });
      }
      return res.json(message.SUCCESS(sumAll));
    })
    .catch(err => {
      console.log(err);
    });
};

const a = async (req, res) => {
  let mbus = ['M.IT', 'M.MA', 'M.BI', 'M.CH', 'M.GE', 'M.PH', 'M.MS'];
  let boss = ['E.EM', 'E.ER', 'E.LL', 'E.PS', 'E.SW'];
  let nhus = ['H.FL', 'H.HI', 'H.ML', 'H.RL', 'H.SC'];
  let sumAll = {};
  let allAll = {};
  too = 0;
  let sent = 0,
    seen = 0,
    pending = 0,
    done = 0,
    reject = 0,
    thanks = 0;
  let all = {};
  for (let q = 0; q < mbus.length; q++) {
    await Post.find()
      .then(data => {
        for (let index = 0; index < data.length; index++) {
          let o = 0;
          for (let j = 0; j < data[index].tagged_user.length; j++) {
            str2 = data[index].tagged_user[j].own_code;
            str3 = JSON.stringify(str2);
            if (str2.substr(0, 4) == mbus[q] && str2.length != 10) o = 1;
          }
          if (o == 1) {
            if (data[index].is_thanks == true) thanks = thanks + 1;
            else if (data[index].perfor_code == 'sent') sent = sent + 1;
            else if (data[index].perfor_code == 'seen') seen = seen + 1;
            else if (data[index].perfor_code == 'pending')
              pending = pending + 1;
            else if (data[index].perfor_code == 'done') done = done + 1;
            else reject = reject + 1; //reject
          }
        }
        all.sent = sent;
        all.seen = seen;
        all.pending = pending;
        all.done = done;
        all.reject = reject;
        all.thanks = thanks;
      })
      .catch(err => {
        console.log(err);
      });
    // sumAll[mbus[q]] = all;
  }
  allAll['МБУС'] = all;
  (sent = 0),
    (seen = 0),
    (pending = 0),
    (done = 0),
    (reject = 0),
    (thanks = 0),
    (all = {});
  for (let q = 0; q < boss.length; q++) {
    await Post.find()
      .then(data => {
        for (let index = 0; index < data.length; index++) {
          let o = 0;
          for (let j = 0; j < data[index].tagged_user.length; j++) {
            str2 = data[index].tagged_user[j].own_code;
            str3 = JSON.stringify(str2);
            if (str2.substr(0, 4) == boss[q] && str2.length != 10) o = 1;
          }
          if (o == 1) {
            if (data[index].is_thanks == true) thanks = thanks + 1;
            else if (data[index].perfor_code == 'sent') sent = sent + 1;
            else if (data[index].perfor_code == 'seen') seen = seen + 1;
            else if (data[index].perfor_code == 'pending')
              pending = pending + 1;
            else if (data[index].perfor_code == 'done') done = done + 1;
            else reject = reject + 1; //reject
          }
        }
        all.sent = sent;
        all.seen = seen;
        all.pending = pending;
        all.done = done;
        all.reject = reject;
        all.thanks = thanks;
      })
      .catch(err => {
        console.log(err);
      });
    // sumAll[boss[q]] = all;
  }
  allAll['БоСС'] = all;
  (sent = 0),
    (seen = 0),
    (pending = 0),
    (done = 0),
    (reject = 0),
    (thanks = 0),
    (all = {});
  for (let q = 0; q < nhus.length; q++) {
    await Post.find()
      .then(data => {
        for (let index = 0; index < data.length; index++) {
          let o = 0;
          for (let j = 0; j < data[index].tagged_user.length; j++) {
            str2 = data[index].tagged_user[j].own_code;
            str3 = JSON.stringify(str2);
            if (str2.substr(0, 4) == nhus[q] && str2.length != 10) o = 1;
          }
          if (o == 1) {
            if (data[index].is_thanks == true) thanks = thanks + 1;
            else if (data[index].perfor_code == 'sent') sent = sent + 1;
            else if (data[index].perfor_code == 'seen') seen = seen + 1;
            else if (data[index].perfor_code == 'pending')
              pending = pending + 1;
            else if (data[index].perfor_code == 'done') done = done + 1;
            else reject = reject + 1; //reject
          }
        }
        all.sent = sent;
        all.seen = seen;
        all.pending = pending;
        all.done = done;
        all.reject = reject;
        all.thanks = thanks;
      })
      .catch(err => {
        console.log(err);
      });
    // sumAll[nhus[q]] = all;
  }
  allAll['НХУС'] = all;
  return res.json(message.SUCCESS(allAll));
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
  if (req.body.is_thanks === true) {
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
      perfor_code: 'done',
      is_thanks: req.body.is_thanks,
      deadline: req.body.deadline
    });
  } else {
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
  }
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

const datePost = (req, res) => {
  Post.find()
    .then(post => {
      for (let index = 0; index < post.length; index++) {
        var GivenDate = post[index].deadline;
        var CurrentDate = new Date();
        GivenDate = new Date(GivenDate);
        if (GivenDate < CurrentDate && post[index].perfor_code != 'done') {
          post[index].perfor_code = 'reject';
        }
        post[index]
          .save()
          .then(post => {
            res.json(message.SUCCESS(post));
          })
          .catch(err => {
            console.log(err);
            return res.json(message.ERROR);
          });
      }
    })
    .catch(e => {
      return res.json(message.ERROR);
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
  updateDisLike,
  c,
  b1,
  b2,
  a,
  datePost
};
