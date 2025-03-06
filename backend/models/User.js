const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: function() { return this.role === "patient"; } },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: function() { return this.role === "patient"; } },
  speciality: { type: String, required: function() { return this.role === "doctor"; } },
  experience: { type: Number, required: function() { return this.role === "doctor"; } },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor"], required: true }
});

// Hash Password Before Saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
