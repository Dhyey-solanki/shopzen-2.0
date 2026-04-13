import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Eco Sneakers",
    price: 79,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Cozy Hoodie",
    price: 59,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  },
];

function CheckoutPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = 12;
  const total = subtotal + shipping - discount;

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <div>
          <span className="section-mini-badge">Checkout details</span>
          <h1>Checkout</h1>
          <p>
            Confirm your shipping details, review your items, and continue to
            payment securely.
          </p>
        </div>

        <div className="checkout-step-badge">
          <h3>Step 2</h3>
          <p>of 3</p>
        </div>
      </section>

      <section className="checkout-steps-row">
        <div className="checkout-step completed-step">
          <span>1</span>
          <p>Cart</p>
        </div>
        <div className="checkout-step active-step">
          <span>2</span>
          <p>Checkout</p>
        </div>
        <div className="checkout-step">
          <span>3</span>
          <p>Payment</p>
        </div>
      </section>

      <section className="checkout-layout">
        <div className="checkout-left-column">
          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Contact Information</h2>
              <p>We will use this to update you about your order.</p>
            </div>

            <div className="checkout-form-grid">
              <div className="checkout-field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>

              <div className="checkout-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email address" />
              </div>

              <div className="checkout-field full-span">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" />
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Shipping Address</h2>
              <p>Enter the address where you want your order delivered.</p>
            </div>

            <div className="checkout-form-grid">
              <div className="checkout-field full-span">
                <label>Street Address</label>
                <input type="text" placeholder="House no, street, area" />
              </div>

              <div className="checkout-field">
                <label>City</label>
                <input type="text" placeholder="Enter city" />
              </div>

              <div className="checkout-field">
                <label>State</label>
                <input type="text" placeholder="Enter state" />
              </div>

              <div className="checkout-field">
                <label>Pincode</label>
                <input type="text" placeholder="Enter pincode" />
              </div>

              <div className="checkout-field">
                <label>Country</label>
                <input type="text" placeholder="Enter country" />
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Delivery Options</h2>
              <p>Select your preferred delivery method.</p>
            </div>

            <div className="delivery-options-list">
              <label className="delivery-option-card active-delivery-option">
                <input type="radio" name="delivery" defaultChecked />
                <div>
                  <h3>Standard Delivery</h3>
                  <p>Delivered in 3-5 business days</p>
                </div>
                <strong>Free</strong>
              </label>

              <label className="delivery-option-card">
                <input type="radio" name="delivery" />
                <div>
                  <h3>Express Delivery</h3>
                  <p>Delivered in 1-2 business days</p>
                </div>
                <strong>$10.00</strong>
              </label>
            </div>
          </div>
        </div>

        <aside className="checkout-summary-card">
          <h2>Order Summary</h2>

          <div className="checkout-products-mini-list">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-mini-item">
                <img src={item.image} alt={item.name} />

                <div className="checkout-mini-item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>

                <strong>${item.price * item.quantity}.00</strong>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

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

          <Link to="/payment" className="checkout-btn">
            Continue to Payment
          </Link>

          <Link to="/cart" className="continue-shopping-link">
            Back to Cart
          </Link>
        </aside>
      </section>
    </div>
  );
}

export default CheckoutPage;