const express = require("express");
const {
  getMyProfile,
  updateMyProfile,
  updateMySettings,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getMyProfile);
router.patch("/profile", protect, updateMyProfile);
router.patch("/settings", protect, updateMySettings);

module.exports = router;
