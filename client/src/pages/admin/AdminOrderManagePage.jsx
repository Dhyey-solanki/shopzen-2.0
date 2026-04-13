import { useState } from "react";
import { Link } from "react-router-dom";

function AdminOrderManagePage() {
  const [orderStatus, setOrderStatus] = useState("Processing");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [adminNote, setAdminNote] = useState("");

  const order = {
    id: "#1002",
    date: "11 Apr 2026",
    customer: "Aarav Patel",
    email: "aarav@example.com",
    phone: "+91 98765 12345",
    amount: 79,
    items: 1,
    paymentMethod: "UPI",
    address: "Street 12, Rajkot, Gujarat, India - 360001",
    products: [
      {
        id: 1,
        name: "Eco Sneakers",
        quantity: 1,
        price: 79,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      orderStatus,
      paymentStatus,
      adminNote,
    });
  };

  return (
    <div className="admin-order-manage-page">
      <section className="admin-order-manage-hero">
        <div>
          <span className="section-mini-badge">Order control panel</span>
          <h1>Manage Order</h1>
          <p>
            Review full order details, update delivery status, and manage
            payment information.
          </p>
        </div>

        <Link to="/admin/orders" className="secondary-btn">
          Back to Orders
        </Link>
      </section>

      <form className="admin-order-manage-layout" onSubmit={handleSubmit}>
        <div className="admin-order-manage-main">
          <section className="admin-form-card">
            <div className="admin-form-card-header">
              <h2>Order Overview</h2>
              <p>Main details of the selected order.</p>
            </div>

            <div className="admin-order-overview-grid">
              <div className="admin-order-overview-box">
                <span>Order ID</span>
                <strong>{order.id}</strong>
              </div>

              <div className="admin-order-overview-box">
                <span>Date</span>
                <strong>{order.date}</strong>
              </div>

              <div className="admin-order-overview-box">
                <span>Total Amount</span>
                <strong>${order.amount}.00</strong>
              </div>

              <div className="admin-order-overview-box">
                <span>Items</span>
                <strong>{order.items}</strong>
              </div>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-header">
              <h2>Customer Information</h2>
              <p>Customer contact and delivery details.</p>
            </div>

            <div className="admin-order-customer-grid">
              <div className="admin-order-info-box">
                <span>Customer Name</span>
                <strong>{order.customer}</strong>
              </div>

              <div className="admin-order-info-box">
                <span>Email Address</span>
                <strong>{order.email}</strong>
              </div>

              <div className="admin-order-info-box">
                <span>Phone Number</span>
                <strong>{order.phone}</strong>
              </div>

              <div className="admin-order-info-box full-span">
                <span>Shipping Address</span>
                <strong>{order.address}</strong>
              </div>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-header">
              <h2>Ordered Products</h2>
              <p>Products included in this order.</p>
            </div>

            <div className="admin-managed-product-list">
              {order.products.map((product) => (
                <div key={product.id} className="admin-managed-product-row">
                  <div className="admin-managed-product-main">
                    <img src={product.image} alt={product.name} />

                    <div>
                      <h3>{product.name}</h3>
                      <p>Qty: {product.quantity}</p>
                    </div>
                  </div>

                  <strong>${product.price}.00</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="admin-order-manage-side">
          <section className="admin-form-card">
            <div className="admin-form-card-header">
              <h2>Status Control</h2>
              <p>Update order and payment progress.</p>
            </div>

            <div className="admin-form-field">
              <label>Order Status</label>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="admin-form-field">
              <label>Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div className="admin-form-field">
              <label>Payment Method</label>
              <input type="text" value={order.paymentMethod} disabled />
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-header">
              <h2>Admin Notes</h2>
              <p>Add internal notes related to this order.</p>
            </div>

            <div className="admin-form-field">
              <textarea
                rows="6"
                placeholder="Write internal admin note..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              ></textarea>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-header">
              <h2>Actions</h2>
              <p>Save the latest updates for this order.</p>
            </div>

            <div className="admin-publish-actions">
              <Link to="/admin/orders" className="cancel-btn-ui">
                Cancel
              </Link>

              <button type="submit" className="save-btn-ui">
                Update Order
              </button>
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}

export default AdminOrderManagePage;