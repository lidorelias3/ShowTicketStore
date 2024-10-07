const express = require("express");
const { TwitterApi } = require("twitter-api-v2");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const config = require("../configs/config");
const handleResponse = require("../utils/responseHandler");
const checkIsAdmin = require("../middleware/isAdmin");

// Initialize the Twitter client with your credentials
const twitterClient = new TwitterApi({
  appKey: config.twitter_api_key,
  appSecret: config.twitter_api_secret,
  accessToken: config.twitter_access_token,
  accessSecret: config.twitter_access_token_secret,
});

// Route to post a tweet
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { message } = req.body;

    // Check if the message exists
    if (!message || message.length === 0) {
      return handleResponse(res, 400, false, "Message is required");
    }

    try {
      // Post the tweet using the Twitter client
      const result = await twitterClient.v2.tweet(message);

      // Return success response with tweet info
      return handleResponse(
        res,
        200,
        true,
        "Tweet posted successfully",
        result
      );
    } catch (error) {
      console.error("Twitter API error:", error);
      return handleResponse(res, 500, false, "Failed to post tweet");
    }
  })
);

module.exports = router;
