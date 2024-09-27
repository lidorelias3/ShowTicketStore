const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/configs/config");

const app = express();
const PORT = 3000;

const authRoutes = require("./src/routes/auth");
const venueRoutes = require("./src/routes/venue");
const eventRoutes = require("./src/routes/event");

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/venue", venueRoutes);
app.use("/api/event", eventRoutes);

app.listen(PORT, (error) => {
  if (!error) console.log("Server is listening on port: " + PORT);
  else console.log("Error occurred, server can't start", error);
});
