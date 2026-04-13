const mongoose = require("mongoose");
const Product = require("../models/Product");

const getProducts = async (req, res, next) => {
  try {
    const { search = "", category, sort = "latest", featured, limit } = req.query;
    const filters = { isActive: true };

    if (category) {
      filters.category = category;
    }

    if (featured === "true") {
      filters.featured = true;
    }

    if (search.trim()) {
      filters.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { category: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const sortMap = {
      latest: { createdAt: -1 },
      lowToHigh: { price: 1 },
      highToLow: { price: -1 },
      rating: { rating: -1, createdAt: -1 },
    };

    let query = Product.find(filters).sort(sortMap[sort] || sortMap.latest);
    const maxItems = Number(limit) > 0 ? Number(limit) : 0;

    if (maxItems) {
      query = query.limit(maxItems);
    }

    const [products, categoryDocs] = await Promise.all([
      query,
      Product.distinct("category", { isActive: true }),
    ]);

    return res.json({
      success: true,
      products,
      categories: ["All", ...categoryDocs.sort((a, b) => a.localeCompare(b))],
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = await Product.findOne({ _id: id, isActive: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
