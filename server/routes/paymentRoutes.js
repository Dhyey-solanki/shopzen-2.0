const express = require("express");
const { completeCheckout } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/checkout", protect, completeCheckout);

module.exports = router;
