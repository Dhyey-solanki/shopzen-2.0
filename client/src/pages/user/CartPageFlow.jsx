import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function CartPageFlow() {
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();

  const shipping = subtotal > 100 ? 0 : items.length ? 10 : 0;
  const discount = 0;
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
          <h3>{items.length}</h3>
          <p>Items in cart</p>
        </div>
      </section>

      {items.length > 0 ? (
        <section className="cart-layout">
          <div className="cart-items-column">
            {items.map((item) => (
              <div key={item.productId} className="cart-item-card">
                <div className="cart-item-image-wrap">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <div>
                      <h3>{item.name}</h3>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="qty-box">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <div className="cart-price-wrap">
                      <span>${item.price.toFixed(2)} each</span>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary-card">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <strong>- ${discount.toFixed(2)}</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-shopping-link">
              Continue shopping
            </Link>
          </aside>
        </section>
      ) : (
        <section className="cart-empty-state">
          <div className="cart-empty-icon">Cart</div>
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

export default CartPageFlow;
