const mongoose = require("mongoose");

// Define the event Schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the event
  date: { type: Date, required: true }, // Date of the  when the venue was added
  prices: [
    {
      ticketType: { type: String, required: true }, // Ticket type (vip, regular)
      price: { type: Int32Array, required: true }, // Price for that ticket
    },
  ],
  venueName: { type: String, required: true }, // The name of the venue
  minimumAge: { type: Int16Array, default: -1 }, // The minimum age to enter the event (-1 indicates there is no minimum)
  description: { type: String }, // Description for the event
  profileImage: { type: String }, // Path to the main profile image of the event
  imagesPaths: [
    {
      path: { type: String },
      description: { type: String },
    },
  ], // More images path with option to add description

  createdAt: { type: Date, default: Date.now }, // Timestamp when the venue was added
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the venue was last updated
});

// Export the event model
const event = mongoose.model("event", eventSchema);
module.exports = event;
