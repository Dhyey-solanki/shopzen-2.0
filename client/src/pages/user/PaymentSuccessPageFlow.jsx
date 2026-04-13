import { Link, Navigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function PaymentSuccessPageFlow() {
  const { lastOrder } = useCart();

  if (!lastOrder?.order) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="payment-success-page">
      <section className="payment-success-card">
        <div className="success-icon-wrap">
          <div className="success-icon-circle">✓</div>
        </div>

        <span className="section-mini-badge">
          {lastOrder.payment?.method === "cod" ? "Order completed" : "Payment completed"}
        </span>

        <h1>{lastOrder.message}</h1>

        <div className="success-order-box">
          <div className="success-order-item">
            <p>Order ID</p>
            <strong>{lastOrder.order._id}</strong>
          </div>
          <div className="success-order-item">
            <p>Payment Status</p>
            <strong>{lastOrder.order.paymentStatus}</strong>
          </div>
          <div className="success-order-item">
            <p>Order Status</p>
            <strong>{lastOrder.order.orderStatus}</strong>
          </div>
          <div className="success-order-item">
            <p>Total</p>
            <strong>${lastOrder.order.totalAmount.toFixed(2)}</strong>
          </div>
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

export default PaymentSuccessPageFlow;
