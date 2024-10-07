const mongoose = require("mongoose");

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  tickets: [
    {
      ticketType: { type: String, required: true }, // Ticket type (vip, regular)
      quantity: { type: Number, required: true, min: 1 }, // Number of tickets purchased
    },
  ],
  totalPrice: { type: Number, required: true, min: 0 }, // Total price for the order
  createdAt: { type: Date, default: Date.now }, // Timestamp when the order was placed
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the order was last updated
});

// Export the event model
const event = mongoose.model("order", orderSchema);
module.exports = event;
