const jwt = require("jsonwebtoken");
const handleResponse = require("../utils/responseHandler");
const config = require("../configs/config");

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return handleResponse(res, 401, false, "No token provided"); // Unauthorized if no token
  }

  jwt.verify(token, config.jwt_secret, (err, user) => {
    if (err) {
      return handleResponse(res, 403, false, "Token is invalid"); // Forbidden if token is invalid
    }

    req.userId = user.id; // Assuming your token payload includes the user ID
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
