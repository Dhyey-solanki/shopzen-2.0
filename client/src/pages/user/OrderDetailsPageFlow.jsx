import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { fetchMyOrderById } from "../../services/orderService";

function OrderDetailsPageFlow() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadOrder = async () => {
      try {
        const response = await fetchMyOrderById(id);

        if (!isActive) {
          return;
        }

        setOrder(response.order);
      } catch (apiError) {
        if (!isActive) {
          return;
        }

        setError(apiError.response?.data?.message || "Unable to load order details");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (loading) {
    return <Loader message="Loading order details..." />;
  }

  if (!order) {
    return (
      <main>
        <h2>Order not found</h2>
        <p>{error || "We could not locate this order."}</p>
        <Link to="/orders" className="button button-secondary">
          Back to orders
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="section-group order-details-page">
        <h2>Order {order._id}</h2>
        <p>Date: {new Date(order.createdAt).toLocaleString("en-IN")}</p>
        <p>Status: {order.orderStatus}</p>
        <p>Payment: {order.paymentStatus}</p>

        <div className="order-items">
          {order.items.map((item) => (
            <div key={`${item.product}-${item.name}`} className="order-line-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        <p>
          Shipping address: {order.shippingAddress.line1}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} - {order.shippingAddress.pincode},{" "}
          {order.shippingAddress.country}
        </p>

        <strong className="order-total">
          Total paid: ${order.totalAmount.toFixed(2)}
        </strong>

        <Link to="/orders" className="button button-link">
          Back to orders
        </Link>
      </section>
    </main>
  );
}

export default OrderDetailsPageFlow;
