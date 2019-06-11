const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
  age: {
    type : Number,
    required : true,
  },
  country: {
    type : String,
    required : true,
    unique : true,
  },
  married : {
    type : Boolean,
    required : true,
  },
  comment : String,

  createdAt : {
    type : Date,
    default : Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);