import { useDeferredValue, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";

function ProductListPageDb() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const deferredSearch = useDeferredValue(search);
  const { addToCart } = useCart();

  const { products, categories, loading, error } = useProducts({
    search: deferredSearch,
    category: selectedFilter === "All" ? "" : selectedFilter,
    sort: sortBy,
  });

  const filteredProducts = useMemo(() => products, [products]);

  const handleAddToCart = (product) => {
    addToCart({
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  };

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
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="sort-box">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="filter-chip-row">
          {categories.map((item) => (
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
        {loading ? <Loader message="Loading products..." /> : null}

        {!loading && error ? (
          <div className="empty-products-state">
            <h3>Unable to load products</h3>
            <p>{error}</p>
          </div>
        ) : null}

        {!loading && !error
          ? filteredProducts.map((product) => (
              <div key={product._id} className="product-card-premium">
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
                    <span>★ {product.rating}</span>
                    <span className="rating-muted">Free Shipping</span>
                  </div>

                  <div className="product-price-row">
                    <strong>${product.price.toFixed(2)}</strong>
                    <span className="price-old">
                      ${(product.compareAtPrice || product.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="product-actions-row">
                    <button
                      className="card-primary-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product._id}`}
                      className="card-secondary-btn"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : null}

        {!loading && !error && filteredProducts.length === 0 ? (
          <div className="empty-products-state">
            <h3>No products found</h3>
            <p>Try changing search text or selecting another category.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default ProductListPageDb;
