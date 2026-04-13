import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function CheckoutPageFlow() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, checkoutDetails, setCheckoutDetails } = useCart();
  const [formData, setFormData] = useState(
    checkoutDetails || {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      line1: user?.address?.line1 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
      country: "India",
      deliveryMethod: "standard",
    }
  );

  if (!items.length) {
    return <Navigate to="/cart" replace />;
  }

  const shipping =
    formData.deliveryMethod === "express" ? 10 : subtotal > 100 ? 0 : 10;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckoutDetails(formData);
    navigate("/payment");
  };

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <div>
          <span className="section-mini-badge">Checkout details</span>
          <h1>Checkout</h1>
          <p>Confirm your shipping details and continue to payment securely.</p>
        </div>
      </section>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-left-column">
          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Contact Information</h2>
            </div>

            <div className="checkout-form-grid">
              <div className="checkout-field">
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-field">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-field full-span">
                <label>Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Shipping Address</h2>
            </div>

            <div className="checkout-form-grid">
              <div className="checkout-field full-span">
                <label>Street Address</label>
                <input
                  name="line1"
                  value={formData.line1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-field">
                <label>City</label>
                <input name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="checkout-field">
                <label>State</label>
                <input name="state" value={formData.state} onChange={handleChange} required />
              </div>
              <div className="checkout-field">
                <label>Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkout-field">
                <label>Country</label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Delivery Options</h2>
            </div>

            <div className="delivery-options-list">
              <label className="delivery-option-card">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="standard"
                  checked={formData.deliveryMethod === "standard"}
                  onChange={handleChange}
                />
                <div>
                  <h3>Standard Delivery</h3>
                  <p>Delivered in 3-5 business days</p>
                </div>
                <strong>{subtotal > 100 ? "Free" : "$10.00"}</strong>
              </label>

              <label className="delivery-option-card">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="express"
                  checked={formData.deliveryMethod === "express"}
                  onChange={handleChange}
                />
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
            {items.map((item) => (
              <div key={item.productId} className="checkout-mini-item">
                <img src={item.image} alt={item.name} />
                <div className="checkout-mini-item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

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

          <button type="submit" className="checkout-btn">
            Continue to Payment
          </button>

          <Link to="/cart" className="continue-shopping-link">
            Back to Cart
          </Link>
        </aside>
      </form>
    </div>
  );
}

export default CheckoutPageFlow;
