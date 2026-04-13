import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const allProducts = [
  {
    id: 1,
    name: "Eco Sneakers",
    category: "Footwear",
    price: 79,
    rating: 4.7,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Smartwatch 3",
    category: "Wearables",
    price: 149,
    rating: 4.4,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Cozy Hoodie",
    category: "Apparel",
    price: 59,
    rating: 4.5,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Noise-Cancelling Headphones",
    category: "Audio",
    price: 129,
    rating: 4.8,
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Classic Backpack",
    category: "Accessories",
    price: 69,
    rating: 4.3,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1542291026-153b8b4f6c6f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Minimal Lamp",
    category: "Home",
    price: 89,
    rating: 4.6,
    badge: "Editor's Pick",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
];

const filters = ["All", "Footwear", "Wearables", "Apparel", "Audio", "Home"];

function ProductListPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedFilter
      );
    }

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [search, selectedFilter, sortBy]);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div>
          <span className="section-mini-badge">Curated collection</span>
          <h1>All products</h1>
          <p>
            Explore the latest finds, trending deals, and premium essentials
            for your lifestyle.
          </p>
        </div>
      </section>

      <section className="products-toolbar-card">
        <div className="products-toolbar-top">
          <div>
            <h2>Browse collection</h2>
            <p>{filteredProducts.length} products available</p>
          </div>
        </div>

        <div className="products-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="sort-box">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="filter-chip-row">
          {filters.map((item) => (
            <button
              key={item}
              className={`filter-chip ${
                selectedFilter === item ? "active-chip" : ""
              }`}
              onClick={() => setSelectedFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="products-grid-ui">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card-premium">
              <div className="product-card-top">
                <span className="product-badge">{product.badge}</span>
                <button className="wishlist-icon-btn">♡</button>
              </div>

              <div className="product-card-premium-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-card-premium-body">
                <span className="product-small-category">
                  {product.category}
                </span>
                <h3>{product.name}</h3>

                <div className="rating-row">
                  <span>⭐ {product.rating}</span>
                  <span className="rating-muted">Free Shipping</span>
                </div>

                <div className="product-price-row">
                  <strong>${product.price}.00</strong>
                  <span className="price-old">${product.price + 20}.00</span>
                </div>

                <div className="product-actions-row">
                  <button className="card-primary-btn">Add to Cart</button>
                  <Link
                    to={`/products/${product.id}`}
                    className="card-secondary-btn"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-products-state">
            <h3>No products found</h3>
            <p>Try changing search text or selecting another category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductListPage;