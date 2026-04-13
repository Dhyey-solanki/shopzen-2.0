import { Link } from "react-router-dom";

const orders = [
  {
    id: 1001,
    date: "2026-04-01",
    status: "Delivered",
    total: 198,
    items: 3,
    payment: "Paid",
  },
  {
    id: 1002,
    date: "2026-04-08",
    status: "Processing",
    total: 79,
    items: 1,
    payment: "Paid",
  },
  {
    id: 1003,
    date: "2026-04-10",
    status: "Shipped",
    total: 149,
    items: 2,
    payment: "Paid",
  },
];

function OrdersPage() {
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div className="orders-page">
      <section className="orders-hero">
        <div>
          <span className="section-mini-badge">Track your purchases</span>
          <h1>My orders</h1>
          <p>
            View all your recent purchases, check their current status, and
            open order details anytime.
          </p>
        </div>

        <div className="orders-summary-grid">
          <div className="orders-summary-card">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>

          <div className="orders-summary-card">
            <h3>{deliveredOrders}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </section>

      {orders.length > 0 ? (
        <section className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card-ui">
              <div className="order-card-top">
                <div>
                  <p className="order-label">Order ID</p>
                  <h3>#{order.id}</h3>
                </div>

                <span
                  className={`order-status-badge ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-info-grid">
                <div className="order-info-box">
                  <p>Date</p>
                  <strong>{order.date}</strong>
                </div>

                <div className="order-info-box">
                  <p>Items</p>
                  <strong>{order.items} item(s)</strong>
                </div>

                <div className="order-info-box">
                  <p>Payment</p>
                  <strong>{order.payment}</strong>
                </div>

                <div className="order-info-box">
                  <p>Total</p>
                  <strong>${order.total}.00</strong>
                </div>
              </div>

              <div className="order-card-actions">
                <Link to={`/orders/${order.id}`} className="card-primary-btn">
                  View Details
                </Link>

                <button className="card-secondary-btn">Track Order</button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="orders-empty-state">
          <div className="orders-empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>
            You have not placed any orders yet. Start shopping and your order
            history will appear here.
          </p>
          <Link to="/products" className="primary-btn">
            Explore Products
          </Link>
        </section>
      )}
    </div>
  );
}

export default OrdersPage;