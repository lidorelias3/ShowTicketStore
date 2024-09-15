const express = require('express');
const bcrypt = require('bcrypt');

const {body, validationResult} = require('express-validator')

const router = express.Router();

const dbcon = require('../utils/db');
const handleResponse = require('../utils/responseHandler');


// Middleware for validating user input
const RegisterValidator = [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];


router.post('/login', async  (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await getUserByEmail(email);
        if (!user) {
            return handleResponse(res, 401, false, "Invalid credentials");
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        if (!passwordMatch) {
            return handleResponse(res, 401, false, "Invalid credentials");
        }

        // Successful login
        // You can generate a JWT or session here if needed
        return handleResponse(res, 200, true, "Login successful", { userId: user.id, email: user.email });

    } catch (error) {
        return handleResponse(res, 500, false, "Server error", null, error.message);
    }
});



router.post('/register', RegisterValidator, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleResponse(res, 400, false, "Invalid arameters" ,errors.array());
    }

    const { firstName, lastName, email, password } = req.body;

    // Generate bcrypt salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const emailExists = await getUserByEmail(email);
        if (emailExists) {
            return handleResponse(res, 409, false, "Email already exists");
        }

    const newUserQuery = 'INSERT INTO users (first_name, last_name, email, hashed_password) VALUES (?, ?, ?, ?)'
    dbcon.query(newUserQuery, [firstName, lastName, email, hashedPassword], function(err, rows) {
        if (err) {
            return handleResponse(res, 400, false, "SQL error", err);
        }

        return handleResponse(res, 200, true, "User registered successfully");
    });
    
});

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const searchEmailQuery = 'SELECT * FROM users WHERE email = ?';
        
        dbcon.query(searchEmailQuery, [email], function (err, rows) {
            if (err) {
                return reject(err);  // Reject the promise with error
            }
            if (rows.length > 0) {
                return resolve(rows[0]);  // Return user details if email exists
            }
            return resolve(null);  // Email does not exist
        });
    });
}


module.exports = router;