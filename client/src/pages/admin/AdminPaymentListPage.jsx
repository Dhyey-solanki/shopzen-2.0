import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const paymentsData = [
  {
    id: "PAY-1001",
    orderId: "#1001",
    customer: "Yuvansh Suthar",
    email: "yuvansh@example.com",
    amount: 186,
    method: "Card",
    status: "Paid",
    date: "12 Apr 2026",
  },
  {
    id: "PAY-1002",
    orderId: "#1002",
    customer: "Aarav Patel",
    email: "aarav@example.com",
    amount: 79,
    method: "UPI",
    status: "Pending",
    date: "11 Apr 2026",
  },
  {
    id: "PAY-1003",
    orderId: "#1003",
    customer: "Priya Sharma",
    email: "priya@example.com",
    amount: 149,
    method: "COD",
    status: "Failed",
    date: "10 Apr 2026",
  },
  {
    id: "PAY-1004",
    orderId: "#1004",
    customer: "Rohan Mehta",
    email: "rohan@example.com",
    amount: 59,
    method: "Card",
    status: "Refunded",
    date: "09 Apr 2026",
  },
];

function AdminPaymentListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayments = useMemo(() => {
    let filtered = [...paymentsData];

    if (statusFilter !== "All") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    if (search.trim()) {
      filtered = filtered.filter(
        (payment) =>
          payment.id.toLowerCase().includes(search.toLowerCase()) ||
          payment.orderId.toLowerCase().includes(search.toLowerCase()) ||
          payment.customer.toLowerCase().includes(search.toLowerCase()) ||
          payment.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, statusFilter]);

  return (
    <div className="admin-payment-page">
      <section className="admin-payment-hero">
        <div>
          <span className="section-mini-badge">Payment management</span>
          <h1>Payment List</h1>
          <p>
            Monitor transactions, verify payment methods, check statuses, and
            manage refunds from one place.
          </p>
        </div>
      </section>

      <section className="admin-payment-toolbar">
        <div className="admin-payment-search">
          <input
            type="text"
            placeholder="Search by payment ID, order ID, customer, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-payment-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </section>

      <section className="admin-payment-table-card">
        <div className="admin-payment-table-head">
          <h2>All Payments</h2>
          <p>{filteredPayments.length} payments found</p>
        </div>

        <div className="admin-payment-list">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="admin-payment-row-card">
              <div className="admin-payment-main">
                <div>
                  <h3>{payment.id}</h3>
                  <p>{payment.customer}</p>
                  <small>{payment.email}</small>
                </div>
              </div>

              <div className="admin-payment-meta">
                <div className="admin-payment-meta-box">
                  <span>Order ID</span>
                  <strong>{payment.orderId}</strong>
                </div>

                <div className="admin-payment-meta-box">
                  <span>Amount</span>
                  <strong>${payment.amount}.00</strong>
                </div>

                <div className="admin-payment-meta-box">
                  <span>Method</span>
                  <strong>{payment.method}</strong>
                </div>

                <div className="admin-payment-meta-box">
                  <span>Date</span>
                  <strong>{payment.date}</strong>
                </div>
              </div>

              <div className="admin-payment-right">
                <span
                  className={`payment-badge ${payment.status.toLowerCase()}`}
                >
                  {payment.status}
                </span>

                <div className="admin-payment-actions">
                  <Link
                    to={`/admin/payments/${payment.id}`}
                    className="card-secondary-btn"
                  >
                    View
                  </Link>

                  {payment.status === "Paid" && (
                    <button className="admin-warning-btn">Refund</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPaymentListPage;