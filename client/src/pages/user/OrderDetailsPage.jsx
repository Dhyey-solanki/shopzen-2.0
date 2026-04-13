import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const orders = [
  { id: "1001", date: "2026-04-01", total: 198, status: "Delivered", items: [ { name: "Smartwatch 3", quantity: 1, price: 149 }, { name: "Everyday Backpack", quantity: 1, price: 49 } ], shipping: "123 Market St, Cityville" },
  { id: "1002", date: "2026-04-08", total: 79, status: "Processing", items: [ { name: "Eco Sneakers", quantity: 1, price: 79 } ], shipping: "456 Elm Ave, Townview" },
];

function OrderDetailsPage() {
  const { id } = useParams();
  const order = useMemo(() => orders.find((item) => item.id === id), [id]);

  if (!order) {
    return (
      <main>
        <h2>Order not found</h2>
        <p>We could not locate this order.</p>
        <Link to="/orders" className="button button-secondary">
          Back to orders
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="section-group order-details-page">
        <h2>Order #{order.id}</h2>
        <p>Date: {order.date}</p>
        <p>Status: {order.status}</p>
        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.name} className="order-line-item">
              <span>{item.name} × {item.quantity}</span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <p>Shipping address: {order.shipping}</p>
        <strong className="order-total">Total paid: ${order.total.toFixed(2)}</strong>
        <Link to="/orders" className="button button-link">
          Back to orders
        </Link>
      </section>
    </main>
  );
}

export default OrderDetailsPage;
