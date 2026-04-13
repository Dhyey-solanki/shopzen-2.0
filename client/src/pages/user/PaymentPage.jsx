import { useState } from "react";
import { Link } from "react-router-dom";

function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState("card");

    const orderSummary = {
        subtotal: 198,
        shipping: 0,
        discount: 12,
        total: 186,
    };

    return (
        <div className="payment-page">
            <section className="payment-hero">
                <div>
                    <span className="section-mini-badge">Secure checkout</span>
                    <h1>Payment</h1>
                    <p>
                        Complete your purchase securely by choosing your preferred payment
                        method.
                    </p>
                </div>

                <div className="payment-hero-badge">
                    <h3>100%</h3>
                    <p>Secure Payment</p>
                </div>
            </section>

            <section className="payment-layout">
                <div className="payment-left-column">
                    <div className="payment-card">
                        <div className="payment-card-header">
                            <h2>Delivery Address</h2>
                        </div>

                        <div className="delivery-address-box">
                            <h3>Yuvansh Suthar</h3>
                            <p>Rajkot, Gujarat, India - 360001</p>
                            <p>Phone: +91 98765 43210</p>
                            <Link to="/edit-profile" className="card-secondary-btn">
                                Change Address
                            </Link>
                        </div>
                    </div>

                    <div className="payment-card">
                        <div className="payment-card-header">
                            <h2>Select Payment Method</h2>
                            <p>Choose one option below.</p>
                        </div>

                        <div className="payment-method-list">
                            <button
                                type="button"
                                className={`payment-method-item ${selectedMethod === "card" ? "active-payment-method" : ""
                                    }`}
                                onClick={() => setSelectedMethod("card")}
                            >
                                <div>
                                    <h3>Credit / Debit Card</h3>
                                    <p>Pay securely using Visa, Mastercard, or RuPay.</p>
                                </div>
                                <span>💳</span>
                            </button>

                            <button
                                type="button"
                                className={`payment-method-item ${selectedMethod === "upi" ? "active-payment-method" : ""
                                    }`}
                                onClick={() => setSelectedMethod("upi")}
                            >
                                <div>
                                    <h3>UPI</h3>
                                    <p>Use Google Pay, PhonePe, Paytm, or any UPI app.</p>
                                </div>
                                <span>📱</span>
                            </button>

                            <button
                                type="button"
                                className={`payment-method-item ${selectedMethod === "cod" ? "active-payment-method" : ""
                                    }`}
                                onClick={() => setSelectedMethod("cod")}
                            >
                                <div>
                                    <h3>Cash on Delivery</h3>
                                    <p>Pay when your order is delivered to your doorstep.</p>
                                </div>
                                <span>💵</span>
                            </button>
                        </div>
                    </div>

                    {selectedMethod === "card" && (
                        <div className="payment-card">
                            <div className="payment-card-header">
                                <h2>Card Details</h2>
                            </div>

                            <div className="payment-form-grid">
                                <div className="payment-field full-span">
                                    <label>Cardholder Name</label>
                                    <input type="text" placeholder="Enter cardholder name" />
                                </div>

                                <div className="payment-field full-span">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" />
                                </div>

                                <div className="payment-field">
                                    <label>Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" />
                                </div>

                                <div className="payment-field">
                                    <label>CVV</label>
                                    <input type="password" placeholder="***" />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedMethod === "upi" && (
                        <div className="payment-card">
                            <div className="payment-card-header">
                                <h2>UPI Payment</h2>
                            </div>

                            <div className="payment-form-grid">
                                <div className="payment-field full-span">
                                    <label>UPI ID</label>
                                    <input type="text" placeholder="example@upi" />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedMethod === "cod" && (
                        <div className="payment-card">
                            <div className="payment-card-header">
                                <h2>Cash on Delivery</h2>
                            </div>

                            <div className="cod-info-box">
                                <p>
                                    You can pay in cash when the order is delivered. Additional
                                    COD charges may apply depending on your location.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <aside className="payment-summary-card">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <strong>${orderSummary.subtotal}.00</strong>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <strong>
                            {orderSummary.shipping === 0
                                ? "Free"
                                : `$${orderSummary.shipping}.00`}
                        </strong>
                    </div>

                    <div className="summary-row">
                        <span>Discount</span>
                        <strong>- ${orderSummary.discount}.00</strong>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total-row">
                        <span>Total</span>
                        <strong>${orderSummary.total}.00</strong>
                    </div>

                    <Link style={{ marginLeft: "140px" }} to="/payment-success" className="checkout-btn">
                        {selectedMethod === "cod" ? "Place Order" : "Pay Now"}
                    </Link>

                    <Link to="/cart" className="continue-shopping-link">
                        Back to Cart
                    </Link>
                </aside>
            </section>
        </div>
    );
}

export default PaymentPage;