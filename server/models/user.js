const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
      type: String,
      required: true,
      trim: true
  },
  lastname: {
      type: String,
      trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
      type: String,
      // default: 'default.jpg'
      required: false,
  },
}, {
  timestamps: true,
});


const User = mongoose.model("user" , userSchema);

module.exports = User;