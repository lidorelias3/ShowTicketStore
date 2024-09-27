const mongoose = require("mongoose");

// Define the venue schema
const venueSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 }, // Name of the venue
  location: {
    address: { type: String, required: true, minlength: 2, maxlength: 50 }, // Street address
    city: { type: String, required: true, minlength: 2, maxlength: 20 }, // City
    state: { type: String, minlength: 2, maxlength: 10 }, // State/Province
    country: { type: String, required: true, minlength: 2, maxlength: 50 }, // Country
  },
  maxCapacity: { type: Number, required: true }, // Seating capacity
  zones: [
    {
      name: { type: String, require: true, minlength: 2, maxlength: 50 },
      capacity: { type: Number, require: true },
    },
  ],
  hasToilet: { type: Boolean, default: false }, // Indicates if the venue has toilets
  hasParking: { type: Boolean, default: false }, // Indicates if the venue has parking
  hasWheelchairAccess: { type: Boolean, default: false }, // Indicates if the venue is wheelchair accessible
  hasWifi: { type: Boolean, default: false }, // Indicates if the venue has WiFi
  hasSmokingArea: { type: Boolean, default: false }, // Indicates if the venue allow smoking
  facilities: [
    { type: String }, // List of other facilities (e.g., bar, food court)
  ],
  createdAt: { type: Date, default: Date.now }, // Timestamp when the venue was added
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the venue was last updated
});

// Validation to check that total zones capacity does not exceed maxCapacity
venueSchema.pre("save", function (next) {
  const totalZoneCapacity = this.zones.reduce(
    (total, zone) => total + zone.capacity,
    0
  );
  if (totalZoneCapacity > this.maxCapacity) {
    const error = new Error(
      "The total zone capacity exceeds the maximum venue capacity."
    );
    next(error);
  } else {
    next();
  }
});

// Export the User model
const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
