const express = require("express");
const {
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrder,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/products", getAdminProducts);
router.get("/products/:id", getAdminProductById);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/orders", getAdminOrders);
router.get("/orders/:id", getAdminOrderById);
router.patch("/orders/:id", updateAdminOrder);

module.exports = router;
