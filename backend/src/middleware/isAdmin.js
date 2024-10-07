const jwt = require("jsonwebtoken");
const handleResponse = require("../utils/responseHandler");
const config = require("../configs/config");

// Middleware to check if the user is authenticated and an admin
const isAdmin = (req, res, next) => {
  // Assuming token is in the Authorization header as "Bearer <token>"
  const token = req.header("Authorization");

  if (!token) {
    return handleResponse(res, 401, false, "Access denied. No token provided.");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.jwt_secret);
    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return handleResponse(
        res,
        403,
        false,
        "Access denied. User is not an admin."
      );
    }

    // Attach user information to the request object
    req.user = decoded; // `decoded` contains user id, isAdmin, etc.

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return handleResponse(res, 400, false, "Invalid token.");
  }
};

module.exports = isAdmin;
