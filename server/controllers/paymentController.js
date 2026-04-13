const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Product = require("../models/Product");

const buildTransactionId = (method) =>
  `${method.toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const completeCheckout = async (req, res, next) => {
  try {
    const {
      items = [],
      shippingAddress,
      deliveryMethod = "standard",
      paymentMethod,
      paymentDetails = {},
      discount = 0,
    } = req.body;

    if (!items.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    if (!shippingAddress?.fullName || !shippingAddress?.line1 || !shippingAddress?.city) {
      return res.status(400).json({
        success: false,
        message: "Shipping details are incomplete",
      });
    }

    if (!["card", "upi", "cod"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds }, isActive: true });
    const productMap = new Map(products.map((product) => [product._id.toString(), product]));

    const normalizedItems = items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("One or more products are no longer available");
      }

      const quantity = Number(item.quantity) || 1;

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      };
    });

    const subtotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = deliveryMethod === "express" ? 10 : subtotal > 100 ? 0 : 10;
    const totalAmount = subtotal + shippingFee - Number(discount || 0);
    const paymentStatus = paymentMethod === "cod" ? "cod_pending" : "paid";

    const order = await Order.create({
      user: req.user.id,
      items: normalizedItems,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      paymentStatus,
      orderStatus: "confirmed",
      subtotal,
      shippingFee,
      discount: Number(discount || 0),
      totalAmount,
    });

    const payment = await Payment.create({
      user: req.user.id,
      order: order._id,
      method: paymentMethod,
      status: paymentStatus,
      amount: totalAmount,
      transactionId: buildTransactionId(paymentMethod),
      details: paymentDetails,
    });

    return res.status(201).json({
      success: true,
      message: paymentMethod === "cod" ? "Order placed successfully" : "Payment successful",
      order,
      payment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  completeCheckout,
};
