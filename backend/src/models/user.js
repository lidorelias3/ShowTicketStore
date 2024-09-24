const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

// Pre-save middleware to hash password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('hashedPassword')) return next();  // Skip if the password isn't modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);  // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;