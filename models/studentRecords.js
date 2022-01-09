// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: mongoose.Schema.Types.ObjectId,
  name: String,
  marks: Number,

});
module.exports = mongoose.model('student', studentSchema);
