const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      default: "",
    },
    sku: {
      type: String,
      trim: true,
      default: "",
    },
    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    details: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    badge: {
      type: String,
      trim: true,
      default: "Popular",
    },
    image: {
      type: String,
      required: [true, "Primary image is required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
