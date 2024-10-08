const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

const handleResponse = require("../utils/responseHandler");
const checkIsAdmin = require("../middleware/isAdmin");

// Get a user by ID
router.get("/:id", checkIsAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return handleResponse(res, 404, false, "User not found");
    }
    return handleResponse(res, 200, true, user, "User found");
  } catch (error) {
    return handleResponse(
      res,
      500,
      false,
      "Error retrieving user",
      error.message
    );
  }
});

router.get("/", checkIsAdmin, async (req, res) => {
  try {

    let queryValid = true;
    // Check that every GET parameter passed to the url is in the Modle's schema
    Object.keys(req.query).forEach((key) => {
      if (! Object.keys(User.schema.paths).includes(key)) {
        queryValid = false;
      }
    });

    if (!queryValid) {
      return handleResponse(res, 404, false, "User not found");
    }

    const user = await User.find(req.query);
    if (!user) {
      return handleResponse(res, 404, false, "User not found");
    }

    return handleResponse(res, 200, true, user, "User found");

  } catch (error) {
    console.log(error);
    return handleResponse(
      res,
      500,
      false,
      "Error retrieving user",
      error.message
    );
  }
});


// Update user by ID
router.put("/:id", checkIsAdmin, async (req, res) => {
  const { firstName, lastName, email, password, age, gender, isAdmin } =
    req.body;

    console.log(JSON.stringify(req.body))

  try {
    const updateData = { firstName, lastName, email, age, gender, isAdmin };

    // If password is provided, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...updateData, updatedAt: Date.now() }, // Update relevant fields and updatedAt timestamp
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return handleResponse(res, 404, false, "User not found");
    }

    return handleResponse(
      res,
      200,
      true,
      updatedUser,
      "User updated successfully"
    );
  } catch (error) {
    return handleResponse(
      res,
      500,
      false,
      "Error updating user",
      error.message
    );
  }
});

// Delete user by ID
router.delete("/:id", checkIsAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return handleResponse(res, 404, false, "User not found");
    }
    return handleResponse(res, 200, true, "User deleted successfully");
  } catch (error) {
    return handleResponse(
      res,
      500,
      false,
      "Error deleting user",
      error.message
    );
  }
});

// Get all users
router.get("/", checkIsAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    return handleResponse(
      res,
      200,
      true,
      users,
      "Users retrieved successfully"
    );
  } catch (error) {
    return handleResponse(
      res,
      500,
      false,
      "Error retrieving users",
      error.message
    );
  }
});

module.exports = router;
