import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchMyOrders } from "../../services/orderService";
import Loader from "../../components/common/Loader";

function MyOrdersPageFlow() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadOrders = async () => {
      try {
        const response = await fetchMyOrders();

        if (!isActive) {
          return;
        }

        setOrders(response.orders || []);
      } catch (apiError) {
        if (!isActive) {
          return;
        }

        setError(apiError.response?.data?.message || "Unable to load your orders");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isActive = false;
    };
  }, []);

  const deliveredOrders = useMemo(
    () => orders.filter((order) => order.orderStatus === "delivered").length,
    [orders]
  );

  if (loading) {
    return <Loader message="Loading your orders..." />;
  }

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
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>

          <div className="orders-summary-card">
            <h3>{deliveredOrders}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </section>

      {error ? (
        <section className="orders-empty-state">
          <h2>Unable to load orders</h2>
          <p>{error}</p>
        </section>
      ) : null}

      {!error && orders.length > 0 ? (
        <section className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card-ui">
              <div className="order-card-top">
                <div>
                  <p className="order-label">Order ID</p>
                  <h3>{order._id}</h3>
                </div>

                <span className={`order-status-badge ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-info-grid">
                <div className="order-info-box">
                  <p>Date</p>
                  <strong>{new Date(order.createdAt).toLocaleDateString("en-IN")}</strong>
                </div>

                <div className="order-info-box">
                  <p>Items</p>
                  <strong>{order.items.length} item(s)</strong>
                </div>

                <div className="order-info-box">
                  <p>Payment</p>
                  <strong>{order.paymentStatus}</strong>
                </div>

                <div className="order-info-box">
                  <p>Total</p>
                  <strong>${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>

              <div className="order-card-actions">
                <Link to={`/orders/${order._id}`} className="card-primary-btn">
                  View Details
                </Link>
                <Link to="/orders/history" className="card-secondary-btn">
                  History
                </Link>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {!error && orders.length === 0 ? (
        <section className="orders-empty-state">
          <h2>No orders yet</h2>
          <p>
            You have not placed any orders yet. Start shopping and your order
            history will appear here.
          </p>
          <Link to="/products" className="primary-btn">
            Explore Products
          </Link>
        </section>
      ) : null}
    </div>
  );
}

export default MyOrdersPageFlow;
