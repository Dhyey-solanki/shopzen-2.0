    import { Link } from "react-router-dom";

function PaymentSuccessPage() {
  return (
    <div className="payment-success-page">
      <section className="payment-success-card">
        <div className="success-icon-wrap">
          <div className="success-icon-circle">✓</div>
        </div>

        <span className="section-mini-badge">Payment completed</span>

        <h1>Payment Successful</h1>

        <p className="payment-success-text">
          Your order has been placed successfully. We have received your payment
          and your items will be processed soon.
        </p>

        <div className="success-order-box">
          <div className="success-order-item">
            <p>Order ID</p>
            <strong>#1003</strong>
          </div>

          <div className="success-order-item">
            <p>Payment Status</p>
            <strong>Paid</strong>
          </div>

          <div className="success-order-item">
            <p>Estimated Delivery</p>
            <strong>3-5 Days</strong>
          </div>

          <div className="success-order-item">
            <p>Total Paid</p>
            <strong>$186.00</strong>
          </div>
        </div>

        <div className="success-info-note">
          A confirmation email and order details have been sent to your
          registered email address.
        </div>

        <div className="payment-success-actions">
          <Link to="/orders" className="primary-btn">
            View My Orders
          </Link>

          <Link to="/products" className="secondary-btn">
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PaymentSuccessPage;