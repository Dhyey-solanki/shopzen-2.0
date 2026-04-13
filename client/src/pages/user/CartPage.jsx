import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Eco Sneakers",
    price: 79,
    quantity: 1,
    size: "42",
    color: "White",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Cozy Hoodie",
    price: 59,
    quantity: 2,
    size: "M",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  },
];

function CartPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = 12;
  const total = subtotal + shipping - discount;

  return (
    <div className="cart-page">
      <section className="cart-hero">
        <div>
          <span className="section-mini-badge">Shopping bag</span>
          <h1>Your cart</h1>
          <p>
            Review your selected items, update quantity, and proceed to secure
            checkout.
          </p>
        </div>

        <div className="cart-hero-badge">
          <h3>{cartItems.length}</h3>
          <p>Items in cart</p>
        </div>
      </section>

      {cartItems.length > 0 ? (
        <section className="cart-layout">
          <div className="cart-items-column">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image-wrap">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="cart-item-variant">
                        Size: <span>{item.size}</span> • Color:{" "}
                        <span>{item.color}</span>
                      </p>
                    </div>

                    <button className="cart-remove-btn">Remove</button>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="qty-box">
                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>
                    </div>

                    <div className="cart-price-wrap">
                      <span>${item.price}.00 each</span>
                      <strong>${item.price * item.quantity}.00</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary-card">
            <h2>Order summary</h2>

            <div className="coupon-box">
              <input type="text" placeholder="Enter coupon code" />
              <button>Apply</button>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal}.00</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>{shipping === 0 ? "Free" : `$${shipping}.00`}</strong>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <strong>- ${discount}.00</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total</span>
              <strong>${total}.00</strong>
            </div>

            <Link style={{ marginLeft: "100px" }} to="/payment" className="checkout-btn">
                Proceed to Checkout
              </Link>

            <Link to="/products" className="continue-shopping-link">
              Continue shopping
            </Link>
          </aside>
        </section>
      ) : (
        <section className="cart-empty-state">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>
            Looks like you have not added anything yet. Browse products and add
            your favorites.
          </p>
          <Link to="/products" className="primary-btn">
            Explore Products
          </Link>
        </section>
      )}
    </div>
  );
}

export default CartPage;