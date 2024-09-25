const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const {body, validationResult} = require('express-validator')

const router = express.Router();

const handleResponse = require('../utils/responseHandler');


// Middleware for validating user input
const RegisterValidator = [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];


router.post('/login', RegisterValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleResponse(res, 400, false, "Invalid arameters" ,errors.array());
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the db
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});




router.post('/register', RegisterValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleResponse(res, 400, false, "Invalid arameters" ,errors.array());
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            hashedPassword: password  // Password will be hashed by the 'pre' hook
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});


module.exports = router;