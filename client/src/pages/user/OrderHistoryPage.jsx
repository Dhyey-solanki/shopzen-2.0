import { Link } from "react-router-dom";

const history = [
  { id: "1000", date: "2026-03-14", total: 129, status: "Delivered" },
  { id: "999", date: "2026-03-05", total: 49, status: "Delivered" },
];

function OrderHistoryPage() {
  return (
    <main>
      <section className="section-group">
        <h2>Order history</h2>
        <p>Past purchases and completed shipments.</p>
        <div className="table-card">
          {history.map((order) => (
            <Link key={order.id} to={`/orders/${order.id}`} className="order-card">
              <div>
                <p>Order #{order.id}</p>
                <p>{order.date}</p>
              </div>
              <div>
                <p>{order.status}</p>
                <strong>${order.total.toFixed(2)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default OrderHistoryPage;
