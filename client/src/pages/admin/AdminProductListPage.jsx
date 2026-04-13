import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const productData = [
  {
    id: 1,
    name: "Eco Sneakers",
    category: "Footwear",
    price: 79,
    stock: 24,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Smartwatch 3",
    category: "Wearables",
    price: 149,
    stock: 8,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Cozy Hoodie",
    category: "Apparel",
    price: 59,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Minimal Lamp",
    category: "Home",
    price: 89,
    stock: 15,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
];

function AdminProductListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    let filtered = [...productData];

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, category]);

  return (
    <div className="admin-product-page">
      <section className="admin-product-hero">
        <div>
          <span className="section-mini-badge">Catalog management</span>
          <h1>Product List</h1>
          <p>
            Manage your store products, update details, check stock, and control
            availability.
          </p>
        </div>

        <Link to="/admin/products/add" className="primary-btn">
          Add Product
        </Link>
      </section>

      <section className="admin-product-toolbar">
        <div className="admin-product-search">
          <input
            type="text"
            placeholder="Search product by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-product-filter">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Footwear">Footwear</option>
            <option value="Wearables">Wearables</option>
            <option value="Apparel">Apparel</option>
            <option value="Home">Home</option>
          </select>
        </div>
      </section>

      <section className="admin-product-table-card">
        <div className="admin-product-table-head">
          <h2>All Products</h2>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="admin-product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="admin-product-row">
              <div className="admin-product-main">
                <img src={product.image} alt={product.name} />

                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                </div>
              </div>

              <div className="admin-product-meta">
                <div className="admin-product-meta-box">
                  <span>Price</span>
                  <strong>${product.price}.00</strong>
                </div>

                <div className="admin-product-meta-box">
                  <span>Stock</span>
                  <strong>{product.stock}</strong>
                </div>

                <div className="admin-product-meta-box">
                  <span>Status</span>
                  <strong
                    className={
                      product.status === "Active"
                        ? "product-status-active"
                        : "product-status-out"
                    }
                  >
                    {product.status}
                  </strong>
                </div>
              </div>

              <div className="admin-product-actions">
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="card-secondary-btn"
                >
                  Edit
                </Link>

                <button className="admin-delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminProductListPage;