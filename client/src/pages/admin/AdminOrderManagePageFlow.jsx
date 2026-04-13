import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAdminOrderById, updateAdminOrder } from "../../services/adminService";
import Loader from "../../components/common/Loader";

function AdminOrderManagePageFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("processing");
  const [paymentStatus, setPaymentStatus] = useState("paid");
  const [adminNote, setAdminNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      const response = await fetchAdminOrderById(id);

      if (!isActive) {
        return;
      }

      setOrder(response.order);
      setOrderStatus(response.order.orderStatus);
      setPaymentStatus(response.order.paymentStatus);
      setAdminNote(response.order.adminNote || "");
      setLoading(false);
    };

    load();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await updateAdminOrder(id, { orderStatus, paymentStatus, adminNote });
    navigate("/admin/orders");
  };

  if (loading) {
    return <Loader message="Loading order..." />;
  }

  return (
    <div className="admin-order-manage-page">
      <section className="admin-order-manage-hero">
        <div>
          <span className="section-mini-badge">Order control panel</span>
          <h1>Manage Order</h1>
          <p>Review full order details and update dispatch or delivery status.</p>
        </div>

        <Link to="/admin/orders" className="secondary-btn">
          Back to Orders
        </Link>
      </section>

      <form className="admin-order-manage-layout" onSubmit={handleSubmit}>
        <div className="admin-order-manage-main">
          <section className="admin-form-card">
            <div className="admin-order-overview-grid">
              <div className="admin-order-overview-box">
                <span>Order ID</span>
                <strong>{order._id}</strong>
              </div>
              <div className="admin-order-overview-box">
                <span>Date</span>
                <strong>{new Date(order.createdAt).toLocaleDateString("en-IN")}</strong>
              </div>
              <div className="admin-order-overview-box">
                <span>Total Amount</span>
                <strong>${order.totalAmount.toFixed(2)}</strong>
              </div>
              <div className="admin-order-overview-box">
                <span>Items</span>
                <strong>{order.items.length}</strong>
              </div>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-order-customer-grid">
              <div className="admin-order-info-box">
                <span>Customer Name</span>
                <strong>{order.user?.name || order.shippingAddress.fullName}</strong>
              </div>
              <div className="admin-order-info-box">
                <span>Email Address</span>
                <strong>{order.user?.email || order.shippingAddress.email}</strong>
              </div>
              <div className="admin-order-info-box">
                <span>Phone Number</span>
                <strong>{order.user?.phone || order.shippingAddress.phone}</strong>
              </div>
              <div className="admin-order-info-box full-span">
                <span>Shipping Address</span>
                <strong>
                  {order.shippingAddress.line1}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}, {order.shippingAddress.country} -{" "}
                  {order.shippingAddress.pincode}
                </strong>
              </div>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-managed-product-list">
              {order.items.map((product, index) => (
                <div key={`${product.product}-${index}`} className="admin-managed-product-row">
                  <div className="admin-managed-product-main">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>Qty: {product.quantity}</p>
                    </div>
                  </div>

                  <strong>${(product.price * product.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="admin-order-manage-side">
          <section className="admin-form-card">
            <div className="admin-form-field">
              <label>Order Status</label>
              <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                <option value="processing">processing</option>
                <option value="confirmed">confirmed</option>
                <option value="packed">packed</option>
                <option value="shipped">shipped</option>
                <option value="out_for_delivery">out_for_delivery</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>

            <div className="admin-form-field">
              <label>Payment Status</label>
              <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                <option value="paid">paid</option>
                <option value="pending">pending</option>
                <option value="cod_pending">cod_pending</option>
                <option value="failed">failed</option>
                <option value="refunded">refunded</option>
              </select>
            </div>

            <div className="admin-form-field">
              <label>Payment Method</label>
              <input type="text" value={order.paymentMethod} disabled />
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-form-field">
              <label>Admin Notes</label>
              <textarea rows="6" value={adminNote} onChange={(e) => setAdminNote(e.target.value)}></textarea>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-publish-actions">
              <Link to="/admin/orders" className="cancel-btn-ui">
                Cancel
              </Link>
              <button type="submit" className="save-btn-ui" disabled={saving}>
                {saving ? "Updating..." : "Update Order"}
              </button>
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}

export default AdminOrderManagePageFlow;
