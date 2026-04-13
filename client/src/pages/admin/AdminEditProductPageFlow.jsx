import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteAdminProduct,
  fetchAdminProductById,
  updateAdminProduct,
} from "../../services/adminService";
import Loader from "../../components/common/Loader";

function AdminEditProductPageFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Footwear",
    price: "",
    stock: "",
    status: "Active",
    brand: "",
    sku: "",
    image: "",
    shortDescription: "",
    fullDescription: "",
  });

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      const response = await fetchAdminProductById(id);

      if (!isActive) {
        return;
      }

      const product = response.product;
      setFormData({
        name: product.name || "",
        category: product.category || "Footwear",
        price: product.price || "",
        stock: product.stock || "",
        status: product.isActive ? "Active" : "Draft",
        brand: product.brand || "",
        sku: product.sku || "",
        image: product.image || "",
        shortDescription: product.shortDescription || product.details?.[0] || "",
        fullDescription: product.description || "",
      });
      setLoading(false);
    };

    load();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await updateAdminProduct(id, formData);
    navigate("/admin/products");
  };

  const handleDelete = async () => {
    await deleteAdminProduct(id);
    navigate("/admin/products");
  };

  if (loading) {
    return <Loader message="Loading product..." />;
  }

  return (
    <div className="admin-edit-product-page">
      <section className="admin-edit-product-hero">
        <div>
          <span className="section-mini-badge">Catalog management</span>
          <h1>Edit Product</h1>
        </div>

        <div className="admin-edit-product-top-actions">
          <Link to="/admin/products" className="secondary-btn">
            Back to Products
          </Link>
        </div>
      </section>

      <form className="admin-edit-product-form-wrap" onSubmit={handleSubmit}>
        <div className="admin-edit-product-layout">
          <div className="admin-edit-product-main">
            <section className="admin-form-card">
              <div className="admin-form-grid">
                <div className="admin-form-field full-span">
                  <label>Product Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="admin-form-field">
                  <label>Category</label>
                  <input name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="admin-form-field">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Brand</label>
                  <input name="brand" value={formData.brand} onChange={handleChange} />
                </div>
                <div className="admin-form-field">
                  <label>SKU</label>
                  <input name="sku" value={formData.sku} onChange={handleChange} />
                </div>
                <div className="admin-form-field">
                  <label>Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="admin-form-field">
                  <label>Stock</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                </div>
                <div className="admin-form-field full-span">
                  <label>Image URL</label>
                  <input name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="admin-form-field full-span">
                  <label>Short Description</label>
                  <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="4"></textarea>
                </div>
                <div className="admin-form-field full-span">
                  <label>Full Description</label>
                  <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows="6"></textarea>
                </div>
              </div>
            </section>
          </div>

          <aside className="admin-edit-product-side">
            <section className="admin-form-card">
              <div className="admin-product-image-preview">
                {formData.image ? <img src={formData.image} alt="Product preview" /> : null}
              </div>
            </section>

            <section className="admin-form-card">
              <div className="admin-publish-actions">
                <Link to="/admin/products" className="cancel-btn-ui">
                  Cancel
                </Link>
                <button type="submit" className="save-btn-ui" disabled={saving}>
                  {saving ? "Updating..." : "Update Product"}
                </button>
                <button type="button" className="admin-delete-btn full-delete-btn" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default AdminEditProductPageFlow;
