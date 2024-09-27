const express = require("express");
const Event = require("../models/event");
const Venue = require("../models/venue");

const router = express.Router();
const asyncHandler = require("express-async-handler");

const handleResponse = require("../utils/responseHandler");

// Create an event
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      name,
      date,
      venueName,
      tickets,
      minimumAge,
      description,
      profileImage,
      imagesPaths,
    } = req.body;

    // Find the venue by name
    const venue = await Venue.findOne({ name: venueName });

    if (!venue) {
      return handleResponse(res, 404, false, "Venue not found");
    }

    // Match tickets to zones in the venue
    const ticketWithZones = tickets.map((ticket) => {
      const zone = venue.zones.find((zone) => zone.name === ticket.ticketType);
      if (!zone) {
        throw new Error(
          `Zone ${ticket.ticketType} not found in venue ${venueName}`
        );
      }
      return {
        ...ticket,
        remaining: zone.capacity, // Set remaining tickets to the zone capacity
      };
    });

    // Create the event
    const newEvent = new Event({
      name,
      date,
      tickets: ticketWithZones,
      venueName,
      minimumAge,
      description,
      profileImage,
      imagesPaths,
    });

    await newEvent.save();

    return handleResponse(res, 201, true, newEvent);
  })
);

// Get all events
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const events = await Event.find();

    return handleResponse(res, 200, true, events);
  })
);

// Get specific event by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const eventId = req.params.id;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return handleResponse(res, 404, false, "Event not found");
    }

    return handleResponse(res, 200, true, event);

    res.json(event);
  })
);

// Update an event by ID
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const {
      name,
      date,
      tickets,
      venueName,
      minimumAge,
      description,
      profileImage,
      imagesPaths,
    } = req.body;

    // Fetch the event and the venue (if the venue is updated)
    const event = await Event.findById(req.params.id);
    if (!event) {
      return handleResponse(res, 404, false, "Event not found");
    }

    let updatedTickets = event.tickets;

    if (venueName) {
      const venue = await Venue.findOne({ name: venueName });
      if (!venue) {
        return handleResponse(res, 404, false, "Venue not found");
      }

      // Update ticket capacities based on the new venue's zones
      updatedTickets = tickets.map((ticket) => {
        const zone = venue.zones.find(
          (zone) => zone.name === ticket.ticketType
        );
        if (!zone) {
          throw new Error(
            `Zone ${ticket.ticketType} not found in venue ${venueName}`
          );
        }
        return {
          ...ticket,
          remaining: zone.capacity, // Update remaining capacity with the new venue's zone capacity
        };
      });
    }

    // Update event fields
    event.name = name || event.name;
    event.date = date || event.date;
    event.tickets = updatedTickets;
    event.venueName = venueName || event.venueName;
    event.minimumAge = minimumAge || event.minimumAge;
    event.description = description || event.description;
    event.profileImage = profileImage || event.profileImage;
    event.imagesPaths = imagesPaths || event.imagesPaths;

    await event.save();

    return handleResponse(res, 200, true, event);
  })
);

// Delete an event by ID
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return handleResponse(res, 404, false, "Event not found");
    }

    return handleResponse(res, 200, true, "Event deleted successfully");
  })
);

// Buy tickets for an event
router.put(
  "/:id/purchase",
  asyncHandler(async (req, res) => {
    const { ticketType, amount } = req.body; // ticketType and amount to purchase
    const eventId = req.params.id;

    // Validate the amount
    if (!amount || amount <= 0) {
      return handleResponse(res, 400, false, "Invalid ticket amount");
    }

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return handleResponse(res, 404, false, "Event not found");
    }

    // Find the specific ticket type (zone) within the event
    const ticket = event.tickets.find(
      (ticket) => ticket.ticketType === ticketType
    );
    if (!ticket) {
      return handleResponse(
        res,
        404,
        false,
        `Ticket type "${ticketType}" not found`
      );
    }

    // Check if there are enough remaining tickets for the requested amount
    if (ticket.remaining < amount) {
      return handleResponse(
        res,
        400,
        false,
        `Only ${ticket.remaining} tickets remaining for ${ticketType}`
      );
    }

    // Decrease the remaining ticket count
    ticket.remaining -= amount;

    // Save the updated event
    await event.save();

    return handleResponse(
      res,
      200,
      true,
      `Successfully purchased ${amount} ${ticketType} tickets. RemainingTickets: ${ticket.remaining}`
    );
  })
);

module.exports = router;
