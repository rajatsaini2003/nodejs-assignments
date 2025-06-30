const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  city: {
    type: String,
    trim: true,
    default: 'Not specified',
    maxlength: 100
  },
  isActive: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model('User', userSchema);