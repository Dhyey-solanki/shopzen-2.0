const Product = require("../models/Product");
const Order = require("../models/Order");

const normalizeProductPayload = (body) => ({
  name: body.name?.trim(),
  category: body.category?.trim(),
  brand: body.brand?.trim() || "",
  sku: body.sku?.trim() || "",
  price: Number(body.price || 0),
  stock: Number(body.stock || 0),
  image: body.image?.trim(),
  shortDescription: body.shortDescription?.trim() || "",
  description: body.fullDescription?.trim() || body.description?.trim(),
  badge: body.badge?.trim() || "Popular",
  compareAtPrice: Number(body.compareAtPrice || body.price || 0),
  featured: Boolean(body.featured),
  isActive: body.status !== "Draft",
});

const getAdminProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

const getAdminProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductPayload(req.body);

    const product = await Product.create({
      ...payload,
      details: payload.shortDescription ? [payload.shortDescription] : [],
      images: payload.image ? [payload.image] : [],
      rating: 4.5,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductPayload(req.body);
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    Object.assign(product, payload, {
      details: payload.shortDescription ? [payload.shortDescription] : product.details,
      images: payload.image ? [payload.image] : product.images,
    });

    await product.save();

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();
    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAdminOrders = async (_req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

const getAdminOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email phone"
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

const updateAdminOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (req.body.orderStatus) {
      order.orderStatus = req.body.orderStatus;
    }

    if (req.body.paymentStatus) {
      order.paymentStatus = req.body.paymentStatus;
    }

    order.adminNote = req.body.adminNote?.trim() || "";

    await order.save();

    return res.json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrder,
};
