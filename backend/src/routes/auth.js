const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const router = express.Router();

const handleResponse = require("../utils/responseHandler");

// Middleware for validating user input
const RegisterValidator = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

router.post("/login", RegisterValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, "Invalid arameters", errors.array());
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return handleResponse(res, 404, false, "User not found");
    }

    // Compare the provided password with the hashed password stored in the db
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return handleResponse(res, 404, false, "Invalid credentials");
    }

    user.hashedPassword = ''

    return handleResponse(res, 200, true, user);
  } catch (error) {
    return handleResponse(res, 500, false, "Error logging in", error.message);
  }
});

router.post("/register", RegisterValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, "Invalid arameters", errors.array());
  }

  const { firstName, lastName, email, password, age, gender } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleResponse(res, 409, false, "Email already in use");
    }

    // Create a new user
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashedPassword: password, // Password will be hashed by the 'pre' hook
      gender: gender,
      age: age,
      isAdmin: false,
    });

    // Save the user to the database
    await newUser.save();
    return handleResponse(res, 201, true, "User registered successfully");
  } catch (error) {
    return handleResponse(
      res,
      500,
      false,
      "Error registering user",
      error.message
    );
  }
});

module.exports = router;
