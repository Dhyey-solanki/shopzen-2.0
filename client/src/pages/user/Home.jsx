import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Eco Sneakers",
    category: "Footwear",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Smartwatch 3",
    category: "Wearables",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Cozy Hoodie",
    category: "Apparel",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  { name: "New Arrivals", icon: "✨" },
  { name: "Best Sellers", icon: "🔥" },
  { name: "On Sale", icon: "💸" },
  { name: "Trending", icon: "📈" },
];

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">New Season Collection</span>
          <h1>Shop smarter, live better.</h1>
          <p>
            Discover stylish products, great deals, smooth checkout, and fast
            delivery — all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-btn">
              Browse Products
            </Link>
            <Link to="/cart" className="secondary-btn">
              View Cart
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <h3>10k+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="hero-stat-card">
              <h3>500+</h3>
              <p>Top Products</p>
            </div>
            <div className="hero-stat-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>

        <div className="hero-image-card">
          <img
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1200&q=80"
            alt="Shopping banner"
          />
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Featured products</h2>
            <p>Handpicked products loved by our customers.</p>
          </div>
          <Link to="/products" className="section-link">
            View all
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card-ui">
              <div className="product-card-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-card-body">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-card-footer">
                  <strong>${product.price}.00</strong>
                  <Link
                    to={`/products/${product.id}`}
                    className="small-outline-btn"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Shop by category</h2>
            <p>Find what you want faster.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((item, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>Explore top picks in {item.name.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;