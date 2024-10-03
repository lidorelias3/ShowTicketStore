const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 100,
  },
  hashedPassword: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "male", "Female", "female", "Other", "other"],
  },
  age: { type: Number, required: true, min: 0, max: 120 },
  isAdmin: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }, // Timestamp when the venue was added
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the venue was last updated
});

// Pre-save middleware to hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next(); // Skip if the password isn't modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Export the User model
const   User = mongoose.model("User", userSchema);
module.exports = User;
