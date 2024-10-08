const express = require("express");

const router = express.Router();
const asyncHandler = require("express-async-handler");
const FB = require("fb");

const config = require("../configs/config");
const handleResponse = require("../utils/responseHandler");
const checkIsAdmin = require("../middleware/isAdmin");

FB.setAccessToken(config.fb_access_token);

// Route to post a message on Facebook
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { message } = req.body;

    // Validate the message
    if (!message || message.length === 0) {
      return handleResponse(res, 400, false, "Message is required");
    }

    try {
      // Use the FB API to post a message
      const response = await FB.api("/476945235492720/feed", "POST", {
        message,
      });

      // Check if post was successful
      if (response && !response.error) {
        return handleResponse(
          res,
          200,
          true,
          "Post successfully created on Facebook",
          response
        );
      } else {
        return handleResponse(res, 500, false, "Failed to post on Facebook");
      }
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      return handleResponse(
        res,
        500,
        false,
        "Failed to post on Facebook",
        error.message
      );
    }
  })
);

module.exports = router;
