const mongoose = require("mongoose");

//Creation of profile schema:
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //specific id in user model via _id field
    ref: "user" //reference to user model
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    //Position
    type: String,
    required: true
  },
  skills: {
    type: [String], //array of strings.
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  }
});
