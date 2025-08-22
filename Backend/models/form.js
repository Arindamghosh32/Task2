const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Developer", "QA", "DBA", "AI/ML Developer"], 
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  
  experiences: {
    type: [experienceSchema], 
    default: []
  },
  skills: {
    type: [String], 
    default: []
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  }
});

module.exports = mongoose.model("Form", formSchema);
