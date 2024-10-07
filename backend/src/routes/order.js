const express = require("express");
const Order = require("../models/order");

const router = express.Router();
const asyncHandler = require("express-async-handler");

const handleResponse = require("../utils/responseHandler");

// Get all orders
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find();
      return handleResponse(
        res,
        200,
        true,
        "Orders retrieved successfully",
        orders
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
  asyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).exec();

      if (!order) {
        return handleResponse(res, 404, false, "Order not found");
      }

      return handleResponse(
        res,
        200,
        true,
        "Order retrieved successfully",
        order
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
