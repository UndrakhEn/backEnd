const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  own_code: {
    type: String,
    require: true
  },
  f_name: {
    type: String,
    require: true
  },
  l_name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  type_code: {
    type: String,
    require: true
  }
});
const User = (module.exports = mongoose.model('users', UsersSchema));
