const User = require('../models/users');
const message = require('../utils/message');
const { userTypes } = require('../utils/userTypes');
const check = (req, res) => {
  let code = req.body.own_code;
  let pass = req.body.password;
  User.findOne({ own_code: code, password: pass }, (err, user) => {
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
  let a = '',
    b = '';
  userTypes.forEach(i => {
    if (i.code === req.body.own_code.substr(0, 4)) {
      a = i.meaning;
      if (req.body.own_code.length === 10) b = 'student';
      else b = 'teacher';
    }
  });
  newUser = new User({
    avatar: req.body.avatar,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    own_code: req.body.own_code,
    register: req.body.register,
    phone: req.body.phone,
    password: req.body.password,
    type: b,
    type_meaning: a
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
      user.avatar = req.body.avatar;
      user.f_name = req.body.f_name;
      user.l_name = req.body.l_name;
      user.register = req.body.register;
      user.phone = req.body.phone;
      user.password = req.body.password;
      user
        .save()
        .then(user => {
          res.json(message.SUCCESS(user));
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
  check,
  create,
  update,
  deletee
};
