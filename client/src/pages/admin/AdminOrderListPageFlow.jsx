import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdminOrders } from "../../services/adminService";
import Loader from "../../components/common/Loader";

function AdminOrderListPageFlow() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      const response = await fetchAdminOrders();

      if (isActive) {
        setOrders(response.orders || []);
        setLoading(false);
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const statusMatch =
        statusFilter === "All" || order.orderStatus === statusFilter;
      const searchText = search.toLowerCase();
      const searchMatch =
        !search.trim() ||
        order._id.toLowerCase().includes(searchText) ||
        order.user?.name?.toLowerCase().includes(searchText) ||
        order.user?.email?.toLowerCase().includes(searchText);
      return statusMatch && searchMatch;
    });
  }, [orders, search, statusFilter]);

  if (loading) {
    return <Loader message="Loading admin orders..." />;
  }

  return (
    <div className="admin-order-page">
      <section className="admin-order-hero">
        <div>
          <span className="section-mini-badge">Order management</span>
          <h1>Order List</h1>
          <p>Track customer orders, payment status, and delivery progress.</p>
        </div>
      </section>

      <section className="admin-order-toolbar">
        <div className="admin-order-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer, or email..."
          />
        </div>

        <div className="admin-order-filter">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="processing">processing</option>
            <option value="confirmed">confirmed</option>
            <option value="packed">packed</option>
            <option value="shipped">shipped</option>
            <option value="out_for_delivery">out_for_delivery</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
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
            <div key={order._id} className="admin-order-row-card">
              <div className="admin-order-main">
                <div>
                  <h3>{order._id}</h3>
                  <p>{order.user?.name || order.shippingAddress?.fullName}</p>
                  <small>{order.user?.email || order.shippingAddress?.email}</small>
                </div>
              </div>

              <div className="admin-order-meta">
                <div className="admin-order-meta-box">
                  <span>Amount</span>
                  <strong>${order.totalAmount.toFixed(2)}</strong>
                </div>
                <div className="admin-order-meta-box">
                  <span>Items</span>
                  <strong>{order.items.length}</strong>
                </div>
                <div className="admin-order-meta-box">
                  <span>Payment</span>
                  <strong>{order.paymentStatus}</strong>
                </div>
                <div className="admin-order-meta-box">
                  <span>Date</span>
                  <strong>{new Date(order.createdAt).toLocaleDateString("en-IN")}</strong>
                </div>
              </div>

              <div className="admin-order-right">
                <span className={`order-status-badge ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>

                <div className="admin-order-actions">
                  <Link to={`/admin/orders/manage/${order._id}`} className="card-primary-btn">
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminOrderListPageFlow;
