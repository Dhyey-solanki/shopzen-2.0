import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ordersData = [
  {
    id: "#1001",
    customer: "Yuvansh Suthar",
    email: "yuvansh@example.com",
    amount: 186,
    items: 3,
    payment: "Paid",
    status: "Delivered",
    date: "12 Apr 2026",
  },
  {
    id: "#1002",
    customer: "Aarav Patel",
    email: "aarav@example.com",
    amount: 79,
    items: 1,
    payment: "Paid",
    status: "Processing",
    date: "11 Apr 2026",
  },
  {
    id: "#1003",
    customer: "Priya Sharma",
    email: "priya@example.com",
    amount: 149,
    items: 2,
    payment: "Pending",
    status: "Shipped",
    date: "10 Apr 2026",
  },
  {
    id: "#1004",
    customer: "Rohan Mehta",
    email: "rohan@example.com",
    amount: 59,
    items: 1,
    payment: "Paid",
    status: "Cancelled",
    date: "09 Apr 2026",
  },
];

function AdminOrderListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    let filtered = [...ordersData];

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (search.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, statusFilter]);

  return (
    <div className="admin-order-page">
      <section className="admin-order-hero">
        <div>
          <span className="section-mini-badge">Order management</span>
          <h1>Order List</h1>
          <p>
            Track customer orders, monitor payment status, and manage delivery
            progress from one place.
          </p>
        </div>

        <Link to="/admin/orders/manage" className="primary-btn">
          Manage Orders
        </Link>
      </section>

      <section className="admin-order-toolbar">
        <div className="admin-order-search">
          <input
            type="text"
            placeholder="Search by order ID, customer, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-order-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </section>

      <section className="admin-order-table-card">
        <div className="admin-order-table-head">
          <h2>All Orders</h2>
          <p>{filteredOrders.length} orders found</p>
        </div>

        <div className="admin-order-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="admin-order-row-card">
              <div className="admin-order-main">
                <div>
                  <h3>{order.id}</h3>
                  <p>{order.customer}</p>
                  <small>{order.email}</small>
                </div>
              </div>

              <div className="admin-order-meta">
                <div className="admin-order-meta-box">
                  <span>Amount</span>
                  <strong>${order.amount}.00</strong>
                </div>

                <div className="admin-order-meta-box">
                  <span>Items</span>
                  <strong>{order.items}</strong>
                </div>

                <div className="admin-order-meta-box">
                  <span>Payment</span>
                  <strong
                    className={
                      order.payment === "Paid"
                        ? "payment-status-paid"
                        : "payment-status-pending"
                    }
                  >
                    {order.payment}
                  </strong>
                </div>

                <div className="admin-order-meta-box">
                  <span>Date</span>
                  <strong>{order.date}</strong>
                </div>
              </div>

              <div className="admin-order-right">
                <span
                  className={`order-status-badge ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

                <div className="admin-order-actions">
                  <Link
                    to={`/admin/orders/${order.id.replace("#", "")}`}
                    className="card-secondary-btn"
                  >
                    View
                  </Link>

                  <button className="card-primary-btn">Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminOrderListPage;