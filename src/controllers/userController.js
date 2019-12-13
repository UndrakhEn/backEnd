const User = require('../models/users');
const message = require('../utils/message');

const get = (req, res) => {
  User.find()
    .then(users => {
      return res.json(message.SUCCESS(users));
    })
    .catch(err => {
      return res.json(message.ERROR);
    });
};

const check = (req, res) => {
  let name = req.body.own_code;
  let pass = req.body.password;
  User.findOne({ own_code: name, password: pass }, (err, user) => {
    if (err) {
      console.log(err);
      return res.json(message.ERROR);
    }
    if (!user) {
      return res.json(message.NOT_FOUND);
    }
    return res.json(message.SUCCESS(user));
  });
};
const create = (req, res) => {
  console.log(req.body);
  newUser = new User({
    own_code: req.body.own_code,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    password: req.body.password,
    type_code: req.body.own_code.substring(0, 4)
  });
  newUser
    .save()
    .then(user => {
      res.json(message.SUCCESS(user));
    })
    .catch(err => {
      console.log(err);
      res.json(message.ERROR);
    });
};

const update = (req, res) => {
  let id = req.body.id;
  User.findById(id)
    .then(user => {
      user.own_code = req.body.own_code;
      user.f_name = req.body.f_name;
      user.l_name = req.body.l_name;
      user.password = req.body.password;
      user.type_code = req.body.type_code;
      user
        .save()
        .then(user => {
          res.json(message.SUCCESS(user));
        })
        .catch(err => {
          return;
          res.json(message.ERROR);
        });
    })
    .catch(err => {
      return res.json(message.NOT_FOUND);
    });
};

const deletee = (req, res) => {
  let id = req.body.id;
  User.findById(id)
    .then(user => {
      user
        .delete()
        .then(user => {
          res.json(message.SUCCESS(user));
        })
        .catch(err => {
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
  // getId,
  // updateUser,
  check,
  create,
  update,
  deletee
};
