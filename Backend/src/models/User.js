
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String }, 
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  password: { type: String }, 
});

module.exports = mongoose.model("User", userSchema);
