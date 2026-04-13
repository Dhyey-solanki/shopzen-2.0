const express = require("express");
const { getMyOrderById, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/mine", protect, getMyOrders);
router.get("/mine/:id", protect, getMyOrderById);

module.exports = router;
