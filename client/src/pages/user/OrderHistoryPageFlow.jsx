import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { fetchMyOrders } from "../../services/orderService";

function OrderHistoryPageFlow() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadHistory = async () => {
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

        setError(apiError.response?.data?.message || "Unable to load order history");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) {
    return <Loader message="Loading order history..." />;
  }

  return (
    <main>
      <section className="section-group">
        <h2>Order history</h2>
        <p>Past purchases and completed shipments.</p>

        {error ? <p>{error}</p> : null}

        {!error && orders.length > 0 ? (
          <div className="table-card">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="order-card"
              >
                <div>
                  <p>Order {order._id}</p>
                  <p>{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <div>
                  <p>{order.orderStatus}</p>
                  <strong>${order.totalAmount.toFixed(2)}</strong>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {!error && orders.length === 0 ? <p>No order history yet.</p> : null}
      </section>
    </main>
  );
}

export default OrderHistoryPageFlow;
