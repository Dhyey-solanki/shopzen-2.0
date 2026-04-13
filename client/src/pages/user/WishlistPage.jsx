import { Link } from "react-router-dom";

const wishlistItems = [
  {
    id: 1,
    name: "Smartwatch 3",
    price: 149,
    category: "Wearables",
    stock: "In Stock",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Noise-Cancelling Headphones",
    price: 129,
    category: "Audio",
    stock: "Only 3 left",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
];

function WishlistPage() {
  const totalItems = wishlistItems.length;

  return (
    <div className="wishlist-page">
      <section className="wishlist-hero">
        <div>
          <span className="section-mini-badge">Saved for later</span>
          <h1>My wishlist</h1>
          <p>
            Keep your favorite products in one place and move them to cart
            anytime.
          </p>
        </div>

        <div className="wishlist-summary-card">
          <h3>{totalItems}</h3>
          <p>Saved items</p>
        </div>
      </section>

      {wishlistItems.length > 0 ? (
        <section className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div className="wishlist-image-wrap">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="wishlist-card-body">
                <div className="wishlist-top-row">
                  <span className="wishlist-category">{item.category}</span>
                  <button className="wishlist-remove-btn">✕</button>
                </div>

                <h3>{item.name}</h3>

                <div className="wishlist-meta">
                  <strong>${item.price}.00</strong>
                  <span className="wishlist-stock">{item.stock}</span>
                </div>

                <div className="wishlist-actions">
                  <button className="card-primary-btn">Move to Cart</button>
                  <Link
                    to={`/products/${item.id}`}
                    className="card-secondary-btn"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="wishlist-empty-state">
          <div className="wishlist-empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>
            Save products you like so you can quickly find them later.
          </p>
          <Link to="/products" className="primary-btn">
            Explore Products
          </Link>
        </section>
      )}
    </div>
  );
}

export default WishlistPage;