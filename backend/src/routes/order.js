const express = require("express");
const Order = require("../models/order");

const router = express.Router();
const asyncHandler = require("express-async-handler");

const handleResponse = require("../utils/responseHandler");
const isAdmin = require("../middleware/isAdmin");
const authenticateToken = require("../middleware/isAuthenticated");


// Aggregates
groupByEvent = [
  {
    $group: {
      _id: "$eventId",
      count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "events",
      localField: "_id",
      foreignField: "_id",
      as: "eventDetails",
    }
  },
  {
    $unwind: "$eventDetails"
  },
  {
    $project: {
      _id: 0,
      eventName: "$eventDetails.name",
      count: 1,
    }
  },
]
groupByDate = [
  {
    $group: {
      _id: {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      createdAt: "$_id",
      count: 1,
    }
  }
]

// Get all orders
router.get(
  "/",
  isAdmin,
  asyncHandler(async (req, res) => {
    try {
      let orders;
      switch (req.query.groupby) {
        case 'event':
          orders = await Order.aggregate(groupByEvent);
          break;
        case 'createdAt':
          orders = await Order.aggregate(groupByDate);
          break;
        default:
          orders = await Order.find(req.query);
      }
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
