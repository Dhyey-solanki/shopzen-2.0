import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  deleteAdminProduct,
  fetchAdminProducts,
} from "../../services/adminService";
import Loader from "../../components/common/Loader";

function AdminProductListPageFlow() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        const response = await fetchAdminProducts();
        if (isActive) {
          setProducts(response.products || []);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch =
        !search.trim() || item.name.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [products, search, category]);

  const handleDelete = async (id) => {
    await deleteAdminProduct(id);
    setProducts((current) => current.filter((product) => product._id !== id));
  };

  if (loading) {
    return <Loader message="Loading admin products..." />;
  }

  return (
    <div className="admin-product-page">
      <section className="admin-product-hero">
        <div>
          <span className="section-mini-badge">Catalog management</span>
          <h1>Product List</h1>
          <p>Manage your store products, update details, and control availability.</p>
        </div>

        <Link to="/admin/products/new" className="primary-btn">
          Add Product
        </Link>
      </section>

      <section className="admin-product-toolbar">
        <div className="admin-product-search">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product by name..." />
        </div>

        <div className="admin-product-filter">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {[...new Set(products.map((item) => item.category))].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
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
            <div key={product._id} className="admin-product-row">
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
                  <strong>${product.price.toFixed(2)}</strong>
                </div>
                <div className="admin-product-meta-box">
                  <span>Stock</span>
                  <strong>{product.stock}</strong>
                </div>
                <div className="admin-product-meta-box">
                  <span>Status</span>
                  <strong className={product.isActive ? "product-status-active" : "product-status-out"}>
                    {product.isActive ? "Active" : "Draft"}
                  </strong>
                </div>
              </div>

              <div className="admin-product-actions">
                <Link to={`/admin/products/edit/${product._id}`} className="card-secondary-btn">
                  Edit
                </Link>
                <button className="admin-delete-btn" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminProductListPageFlow;
