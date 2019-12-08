const mongoose = require('mongoose');

const TypeCodeSchema = mongoose.Schema({
  code: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
});
const TypeCode = (module.exports = mongoose.model(
  'type_codes',
  TypeCodeSchema
));
