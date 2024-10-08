const express = require("express");
const Venue = require("../models/venue");

const router = express.Router();
const handleResponse = require("../utils/responseHandler");
const checkIsAdmin = require("../middleware/isAdmin");

// Add a new venue
router.post("/", checkIsAdmin, async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    return handleResponse(res, 201, true, venue);
  } catch (error) {
    return handleResponse(res, 400, false, error.message);
  }
});

// Get all venues
router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find();
    return handleResponse(res, 200, true, venues);
  } catch (error) {
    return handleResponse(res, 500, false, error.message);
  }
});

// Get a single venue by ID
router.get("/id/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return handleResponse(res, 404, false, "Venue not found");
    }
    return handleResponse(res, 200, true, venue);
  } catch (error) {
    return handleResponse(res, 500, false, error.message);
  }
});

// Get a single venue by ID
router.get("/name/:name", async (req, res) => {
  try {
    const venue = await Venue.find({name: req.params.name});
    if (!venue) {
      return handleResponse(res, 404, false, "Venue not found");
    }
    return handleResponse(res, 200, true, venue);
  } catch (error) {
    return handleResponse(res, 500, false, error.message);
  }
});

// Update a venue
router.put("/:id", checkIsAdmin,  async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!venue) {
      return handleResponse(res, 404, false, "Venue not found");
    }
    return handleResponse(res, 200, true, venue);
  } catch (error) {
    return handleResponse(res, 400, false, error.message);
  }
});

// Delete a venue
router.delete("/:id", checkIsAdmin, async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) {
      return handleResponse(res, 404, false, "Venue not found");
    }
    return handleResponse(res, 200, true, "Venue deleted successfully");
  } catch (error) {
    return handleResponse(res, 500, false, error.message);
  }
});

module.exports = router;
