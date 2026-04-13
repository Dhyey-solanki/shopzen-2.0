const Product = require("../models/Product");

const sampleProducts = [
  {
    name: "Eco Sneakers",
    category: "Footwear",
    price: 79,
    compareAtPrice: 99,
    rating: 4.7,
    badge: "Best Seller",
    stock: 18,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Lightweight sneakers made from recycled materials with comfort built for daily wear.",
    details: [
      "Breathable knit upper",
      "Cushioned midsole",
      "Made with recycled materials",
    ],
  },
  {
    name: "Smartwatch 3",
    category: "Wearables",
    price: 149,
    compareAtPrice: 179,
    rating: 4.4,
    badge: "Trending",
    stock: 12,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "A sleek smartwatch with fitness tracking, call alerts, and all-day battery life.",
    details: [
      "Heart rate monitoring",
      "Sleep and activity tracking",
      "Water resistant design",
    ],
  },
  {
    name: "Cozy Hoodie",
    category: "Apparel",
    price: 59,
    compareAtPrice: 79,
    rating: 4.5,
    badge: "Popular",
    stock: 30,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Soft everyday hoodie with a relaxed fit for casual comfort and layering.",
    details: [
      "Premium cotton blend",
      "Warm fleece lining",
      "Relaxed everyday fit",
    ],
  },
  {
    name: "Noise-Cancelling Headphones",
    category: "Audio",
    price: 129,
    compareAtPrice: 159,
    rating: 4.8,
    badge: "Top Rated",
    stock: 10,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Immersive over-ear headphones with clear audio and reliable active noise cancellation.",
    details: [
      "Deep bass and crisp vocals",
      "Long battery life",
      "Comfortable padded earcups",
    ],
  },
  {
    name: "Classic Backpack",
    category: "Accessories",
    price: 69,
    compareAtPrice: 89,
    rating: 4.3,
    badge: "New",
    stock: 20,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "A versatile backpack with enough room for work, travel, or campus essentials.",
    details: [
      "Multiple storage compartments",
      "Durable water-resistant finish",
      "Comfortable padded straps",
    ],
  },
  {
    name: "Minimal Lamp",
    category: "Home",
    price: 89,
    compareAtPrice: 109,
    rating: 4.6,
    badge: "Editor's Pick",
    stock: 14,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    ],
    description:
      "Modern table lamp with a clean silhouette that suits bedrooms, desks, and study corners.",
    details: [
      "Soft warm lighting",
      "Minimal modern design",
      "Compact footprint",
    ],
  },
];

const seedProductsIfEmpty = async () => {
  const productCount = await Product.countDocuments();

  if (productCount > 0) {
    return;
  }

  await Product.insertMany(sampleProducts);
  console.log("Seeded starter products");
};

module.exports = {
  seedProductsIfEmpty,
};
