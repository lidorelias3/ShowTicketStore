const mongoose = require("mongoose");

// Define the venue schema
const venueSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the venue
  location: {
    address: { type: String, required: true }, // Street address
    city: { type: String, required: true }, // City
    state: { type: String }, // State/Province
    country: { type: String, required: true }, // Country
  },
  maxCapacity: { type: Number, required: true }, // Seating capacity
  zones: {
    name: { type: String, require: true },
    capacity: { type: Int32Array, require: true },
    validate: {
      validator: function (value) {
        const totalZoneCapacity = this.parent().zones.reduce(
          (total, zone) => total + zone.capacity,
          0
        );
        return totalZoneCapacity <= this.parent().capacity;
      },
      message: "The total zone capacity exceeds the maximum venue capacity.",
    },
  },
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

// Export the User model
const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
