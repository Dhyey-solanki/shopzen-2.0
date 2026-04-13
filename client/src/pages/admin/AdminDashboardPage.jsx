import { Link } from "react-router-dom";

const dashboardStats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: "👤",
    change: "+12.5%",
  },
  {
    title: "Total Orders",
    value: "326",
    icon: "📦",
    change: "+8.2%",
  },
  {
    title: "Revenue",
    value: "$12,480",
    icon: "💰",
    change: "+15.1%",
  },
  {
    title: "Products",
    value: "84",
    icon: "🛍️",
    change: "+4.3%",
  },
];

const recentOrders = [
  {
    id: "#1001",
    customer: "Aarav Patel",
    amount: "$198.00",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Priya Sharma",
    amount: "$79.00",
    status: "Processing",
  },
  {
    id: "#1003",
    customer: "Rohan Mehta",
    amount: "$149.00",
    status: "Shipped",
  },
];

const topProducts = [
  {
    name: "Eco Sneakers",
    sales: "124 sales",
  },
  {
    name: "Smartwatch 3",
    sales: "98 sales",
  },
  {
    name: "Cozy Hoodie",
    sales: "76 sales",
  },
];

function AdminDashboardPage() {
  return (
    <div className="admin-dashboard-page">
      <section className="admin-dashboard-hero">
        <div>
          <span className="section-mini-badge">Admin Control Center</span>
          <h1>Admin Dashboard</h1>
          <p>
            Manage users, products, orders, and payments from one clean
            dashboard.
          </p>
        </div>

        <div className="admin-dashboard-hero-actions">
          <Link to="/admin/products/new" className="primary-btn">
            Add Product
          </Link>
          <Link to="/admin/orders" className="secondary-btn">
            View Orders
          </Link>
        </div>
      </section>

      <section className="admin-stats-grid">
        {dashboardStats.map((item, index) => (
          <div key={index} className="admin-stat-card">
            <div className="admin-stat-top">
              <span className="admin-stat-icon">{item.icon}</span>
              <span className="admin-stat-change">{item.change}</span>
            </div>

            <h3>{item.value}</h3>
            <p>{item.title}</p>
          </div>
        ))}
      </section>

      <section className="admin-quick-actions-card">
        <div className="admin-section-header">
          <h2>Quick Actions</h2>
          <p>Jump quickly to the most used admin operations.</p>
        </div>

        <div className="admin-quick-actions-grid">
          <Link to="/admin/users" className="admin-action-card">
            <span>👥</span>
            <h3>User List</h3>
            <p>Manage all registered users.</p>
          </Link>

          <Link to="/admin/products" className="admin-action-card">
            <span>🛒</span>
            <h3>Product List</h3>
            <p>View, edit, and manage products.</p>
          </Link>

          <Link to="/admin/products/new" className="admin-action-card">
            <span>➕</span>
            <h3>Add Product</h3>
            <p>Create a new product listing.</p>
          </Link>

          <Link to="/admin/orders" className="admin-action-card">
            <span>📦</span>
            <h3>Order List</h3>
            <p>Track and update customer orders.</p>
          </Link>

          <Link to="/admin/orders/manage" className="admin-action-card">
            <span>⚙️</span>
            <h3>Manage Orders</h3>
            <p>Update order status and details.</p>
          </Link>

          <Link to="/admin/payments" className="admin-action-card">
            <span>💳</span>
            <h3>Payment List</h3>
            <p>Monitor transactions and payment records.</p>
          </Link>
        </div>
      </section>

      <section className="admin-dashboard-bottom-grid">
        <div className="admin-panel-card">
          <div className="admin-section-header">
            <h2>Recent Orders</h2>
            <p>Latest orders placed by customers.</p>
          </div>

          <div className="admin-orders-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="admin-order-row">
                <div>
                  <h3>{order.id}</h3>
                  <p>{order.customer}</p>
                </div>

                <div>
                  <strong>{order.amount}</strong>
                </div>

                <span
                  className={`order-status-badge ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel-card">
          <div className="admin-section-header">
            <h2>Top Products</h2>
            <p>Best performing products right now.</p>
          </div>

          <div className="admin-top-products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="admin-top-product-row">
                <div className="admin-top-product-rank">{index + 1}</div>

                <div>
                  <h3>{product.name}</h3>
                  <p>{product.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;