const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  marks: Number,
});
module.exports = mongoose.model('StudentRecords', schema);
