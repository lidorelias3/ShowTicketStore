const express = require("express");
const Order = require("../models/order");

const router = express.Router();
const asyncHandler = require("express-async-handler");

const handleResponse = require("../utils/responseHandler");
const isAdmin = require("../middleware/isAdmin");
const authenticateToken = require("../middleware/isAuthenticated");


router.get(
  "/",
  isAdmin,
  asyncHandler(async (req, res) => {
    try {

      let queryValid = true;
      // Check that every GET parameter passed to the url is in the Modle's schema
      Object.keys(req.query).forEach((key) => {
        if (! Object.keys(Order.schema.paths).includes(key)) {
          queryValid = false;
        }
      });

      const orders = await Order.find(req.query);
      return handleResponse(
        res,
        200,
        true,
        orders,
        "Orders retrieved successfully"
        
      );
    } catch (err) {
      return handleResponse(
        res,
        500,
        false,
        "Failed to retrieve orders",
        err.message
      );
    }
  })
);

// Get order by ID
router.get(
  "/:id",
  authenticateToken,
  asyncHandler(async (req, res) => {
    try {
      if (req.userId != req.params.id) {
        return handleResponse(res, 401, false, "התקיים נסיון לגשת להיסטוריית קניות של משתמש אחר");
      }
      
      let queryValid = true;
      // Check that every GET parameter passed to the url is in the Modle's schema
      Object.keys(req.query).forEach((key) => {
        if (! Object.keys(Order.schema.paths).includes(key)) {
          queryValid = false;
        }
      });
      
      const order = await Order.find({...{userId: req.params.id}, ...req.query}).exec();

      if (!order || order.length == 0) {
        return handleResponse(res, 404, false, "Order not found");
      }

      return handleResponse(
        res,
        200,
        true,
        order,
        "Order retrieved successfully"
      );
    } catch (err) {
      return handleResponse(
        res,
        500,
        false,
        "Failed to retrieve order",
          err.message
      );
    }
  })
);

module.exports = router;
