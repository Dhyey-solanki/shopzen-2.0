import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { completeCheckout } from "../../services/paymentService";

function PaymentPageFlow() {
  const navigate = useNavigate();
  const { items, subtotal, checkoutDetails, clearCart, setLastOrder } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!items.length) {
    return <Navigate to="/cart" replace />;
  }

  if (!checkoutDetails) {
    return <Navigate to="/checkout" replace />;
  }

  const shipping =
    checkoutDetails.deliveryMethod === "express" ? 10 : subtotal > 100 ? 0 : 10;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handlePayment = async () => {
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: checkoutDetails.fullName,
          email: checkoutDetails.email,
          phone: checkoutDetails.phone,
          line1: checkoutDetails.line1,
          city: checkoutDetails.city,
          state: checkoutDetails.state,
          pincode: checkoutDetails.pincode,
          country: checkoutDetails.country,
        },
        deliveryMethod: checkoutDetails.deliveryMethod,
        paymentMethod: selectedMethod,
        paymentDetails:
          selectedMethod === "card"
            ? {
                cardholderName: formData.cardholderName,
                cardLast4: formData.cardNumber.slice(-4),
              }
            : selectedMethod === "upi"
              ? { upiId: formData.upiId }
              : {},
        discount,
      };

      const response = await completeCheckout(payload);
      setLastOrder(response);
      clearCart();
      navigate("/payment-success");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="payment-page">
      <section className="payment-hero">
        <div>
          <span className="section-mini-badge">Secure checkout</span>
          <h1>Payment</h1>
          <p>Complete your purchase securely by choosing your preferred payment method.</p>
        </div>
      </section>

      <section className="payment-layout">
        <div className="payment-left-column">
          <div className="payment-card">
            <div className="payment-card-header">
              <h2>Delivery Address</h2>
            </div>

            <div className="delivery-address-box">
              <h3>{checkoutDetails.fullName}</h3>
              <p>
                {checkoutDetails.line1}, {checkoutDetails.city}, {checkoutDetails.state} -{" "}
                {checkoutDetails.pincode}
              </p>
              <p>Phone: {checkoutDetails.phone}</p>
              <Link to="/checkout" className="card-secondary-btn">
                Change Address
              </Link>
            </div>
          </div>

          <div className="payment-card">
            <div className="payment-card-header">
              <h2>Select Payment Method</h2>
            </div>

            <div className="payment-method-list">
              {["card", "upi", "cod"].map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`payment-method-item ${
                    selectedMethod === method ? "active-payment-method" : ""
                  }`}
                  onClick={() => setSelectedMethod(method)}
                >
                  <div>
                    <h3>
                      {method === "card"
                        ? "Credit / Debit Card"
                        : method === "upi"
                          ? "UPI"
                          : "Cash on Delivery"}
                    </h3>
                    <p>
                      {method === "card"
                        ? "Pay securely using your card."
                        : method === "upi"
                          ? "Use Google Pay, PhonePe, Paytm, or any UPI app."
                          : "Pay when your order is delivered."}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedMethod === "card" ? (
            <div className="payment-card">
              <div className="payment-form-grid">
                <div className="payment-field full-span">
                  <label>Cardholder Name</label>
                  <input
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                  />
                </div>
                <div className="payment-field full-span">
                  <label>Card Number</label>
                  <input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="payment-field">
                  <label>Expiry Date</label>
                  <input
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="payment-field">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {selectedMethod === "upi" ? (
            <div className="payment-card">
              <div className="payment-field full-span">
                <label>UPI ID</label>
                <input name="upiId" value={formData.upiId} onChange={handleChange} />
              </div>
            </div>
          ) : null}

          {selectedMethod === "cod" ? (
            <div className="payment-card">
              <div className="cod-info-box">
                <p>You can pay in cash when the order is delivered.</p>
              </div>
            </div>
          ) : null}

          {error ? <p>{error}</p> : null}
        </div>

        <aside className="payment-summary-card">
          <h2>Order Summary</h2>
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

          <button className="checkout-btn" onClick={handlePayment} disabled={submitting}>
            {submitting ? "Processing..." : selectedMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>

          <Link to="/checkout" className="continue-shopping-link">
            Back to Checkout
          </Link>
        </aside>
      </section>
    </div>
  );
}

export default PaymentPageFlow;
