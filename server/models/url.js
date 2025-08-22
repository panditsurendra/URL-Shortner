const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrlId: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  // Link to the user who created the URL
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const URL = mongoose.model("url" ,urlSchema );

module.exports= URL;

