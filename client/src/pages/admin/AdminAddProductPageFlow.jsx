import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAdminProduct } from "../../services/adminService";

function AdminAddProductPageFlow() {
  const navigate = useNavigate();
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await createAdminProduct(formData);
      navigate("/admin/products");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-add-product-page">
      <section className="admin-add-product-hero">
        <div>
          <span className="section-mini-badge">Catalog management</span>
          <h1>Add Product</h1>
          <p>Create a new product listing with pricing, stock, image, and full details.</p>
        </div>

        <div className="admin-add-product-top-actions">
          <Link to="/admin/products" className="secondary-btn">
            Back to Products
          </Link>
        </div>
      </section>

      <form className="admin-add-product-form-wrap" onSubmit={handleSubmit}>
        <div className="admin-add-product-layout">
          <div className="admin-add-product-main">
            <section className="admin-form-card">
              <div className="admin-form-grid">
                <div className="admin-form-field full-span">
                  <label>Product Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="admin-form-field">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Footwear">Footwear</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Home">Home</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Audio">Audio</option>
                  </select>
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

          <aside className="admin-add-product-side">
            <section className="admin-form-card">
              <div className="admin-product-image-preview">
                {formData.image ? (
                  <img src={formData.image} alt="Product preview" />
                ) : (
                  <div className="admin-product-image-placeholder">No image preview</div>
                )}
              </div>
            </section>

            {error ? <p>{error}</p> : null}

            <section className="admin-form-card">
              <div className="admin-publish-actions">
                <Link to="/admin/products" className="cancel-btn-ui">
                  Cancel
                </Link>
                <button type="submit" className="save-btn-ui" disabled={saving}>
                  {saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default AdminAddProductPageFlow;
