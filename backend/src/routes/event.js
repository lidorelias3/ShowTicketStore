const express = require("express");
const asyncHandler = require("express-async-handler");
const FB = require("fb");

const config = require("../configs/config");

const Event = require("../models/event");
const Venue = require("../models/venue");
const Order = require("../models/order");

const router = express.Router();

const handleResponse = require("../utils/responseHandler");
const authenticateToken = require("../middleware/isAuthenticated");
const checkIsAdmin = require("../middleware/isAdmin");
const tryPredictWeather = require("../utils/predictWeather");

FB.setAccessToken(config.fb_access_token);

// Create an event
router.post(
  "/",
  checkIsAdmin,
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
        return handleResponse(
          res,
          404,
          false,
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

    // Post event on FB
    const message = `🎉 Exciting News – A New Show is Coming! 🎉\n\nWe’re thrilled to announce our upcoming show at ${venueName} on ${date}! Don’t miss out on an unforgettable experience.\n\n🎟️ Get your tickets now on our official website: http://127.0.0.1:4200`;
    const response = await FB.api("/476945235492720/feed", "POST", {
      message,
    });

    return handleResponse(res, 201, true, newEvent);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      // Extract query parameters
      const { maxprice, venue, minage } = req.query;

      // Build query object dynamically
      let query = {};

      // Add max price filter if provided (checks ticket prices)
      if (maxprice) {
        query["tickets.price"] = { $lte: Number(maxprice) };
      }

      if (minage) {
        query.minimumAge = { $gt: Number(minage) };
      }
      // Add venue filter if provided
      if (venue) {
        query.venueName = new RegExp(venue, "i"); // Case-insensitive search for venue name
      }

      // Execute the query using Mongoose and jsonify before modifications
      let events = JSON.parse(JSON.stringify(await Event.find(query)));
      for (let i=0; i < events.length; ++i) {
        await tryPredictWeather(events[i]);
      }

      // Check if any events found
      if (!events.length) {
        return handleResponse(res, 404, false, "No events matching found");
      }

      // Return the filtered events
      return handleResponse(res, 200, true, events, "Events found");
    } catch (error) {
      console.error(error);
      return handleResponse(res, 500, false, "Server error");
    }
  })
);

// Get specific event by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const eventId = req.params.id;

    // Find the event by ID
    const match = await Event.findById(eventId);
    if (!match) {
      return handleResponse(res, 404, false, "Event not found");
    }

    let event = JSON.parse(JSON.stringify(match));
    await tryPredictWeather(event);
    return handleResponse(res, 200, true, event);

  })
);

// Update an event by Name
router.put(
  "/:name",
  checkIsAdmin,
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
    const event = await Event.findOne({ name: String(req.params.name) });
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
          return handleResponse(
            res,
            404,
            false,
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

// Delete an event by Name
router.delete(
  "/:name",
  checkIsAdmin,
  asyncHandler(async (req, res) => {
    const result = await Event.deleteOne({ name: req.params.name });
    if (!result.acknowledged) {
      return handleResponse(res, 500, false, "Error during deletion");
    }

    if (result.deletedCount === 0) {
      return handleResponse(res, 404, false, "Event not found");
    }

    return handleResponse(res, 200, true, "Event deleted successfully");
  })
);

// Buy tickets for an event [{eventID, ticketType, quantity}]
router.post(
  "/purchase",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    const purchases = body.tickets.map((it) => {
      return {
        userId: userId,
        eventId: it.eventId,
        ticketType: it.ticketType,
        quantity: it.quantity,
      };
    });

    const validPurchases = [];

    for (const purchase of purchases) {
      // Validate the amount
      if (!purchase.quantity || purchase.quantity <= 0) {
        return handleResponse(res, 400, false, "Invalid ticket amount");
      }

      // Validate id is in 24 length
      if (!purchase.eventId.match(/^[0-9a-fA-F]{24}$/)) {
        return handleResponse(res, 400, false, "Event not found");
      }
      // Find the event by ID
      const event = await Event.findById(purchase.eventId);
      if (!event) {
        return handleResponse(res, 404, false, "Event not found");
      }

      // Find the specific ticket type (zone) within the event
      const ticket = event.tickets.find(
        (ticket) => ticket.ticketType === purchase.ticketType
      );

      if (!ticket) {
        return handleResponse(
          res,
          404,
          false,
          `Ticket type "${purchase.ticketType}" not found`
        );
      }

      // Check if there are enough remaining tickets for the requested amount
      if (ticket.remaining < purchase.quantity) {
        return handleResponse(
          res,
          400,
          false,
          `Only ${ticket.remaining} tickets remaining for ${purchase.ticketType}`
        );
      }

      // Add the purchase to the valid purchases list
      validPurchases.push(purchase);
    }

    if (validPurchases.length === 0) {
      return handleResponse(res, 400, false, "No valid purchases found.");
    }

    // Group purchases by eventId
    const purchasesPerEvent = validPurchases.reduce((acc, purchase) => {
      if (!acc[purchase.eventId]) {
        acc[purchase.eventId] = [];
      }
      acc[purchase.eventId].push(purchase);
      return acc;
    }, {});

    // Process each event's purchases
    const orderPromises = Object.keys(purchasesPerEvent).map(
      async (eventId) => {
        const totalPricePromises = purchasesPerEvent[eventId].map(
          async (purchase) => {
            const event = await Event.findById(purchase.eventId); // Find the event to get the ticket price
            const ticket = event.tickets.find(
              (ticket) => ticket.ticketType === purchase.ticketType
            );
            return ticket.price * purchase.quantity; // Return the total price for this purchase
          }
        );

        // Wait for all promises to resolve
        const totalPrices = await Promise.all(totalPricePromises);

        // Sum up the total prices
        const totalPrice = totalPrices.reduce(
          (total, price) => total + price,
          0
        );

        // Simplified tickets for the order
        const simplifiedTickets = purchasesPerEvent[eventId].map((item) => ({
          ticketType: item.ticketType,
          quantity: item.quantity,
        }));

        // Create the order
        const order = new Order({
          userId,
          eventId,
          tickets: simplifiedTickets,
          totalPrice,
        });
        await order.save();

        // Decrease remaining tickets for each purchase
        for (const purchase of purchasesPerEvent[eventId]) {
          const event = await Event.findById(purchase.eventId);
          const ticket = event.tickets.find(
            (ticket) => ticket.ticketType === purchase.ticketType
          );
          ticket.remaining -= purchase.quantity;
          await event.save();
        }
      }
    );

    // Wait for all orders to be processed before sending a response
    await Promise.all(orderPromises);

    return handleResponse(res, 200, true, `Successfully purchased tickets.`);
  })
);

module.exports = router;
