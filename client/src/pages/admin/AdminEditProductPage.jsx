import { useState } from "react";
import { Link } from "react-router-dom";

function AdminEditProductPage() {
  const [formData, setFormData] = useState({
    name: "Eco Sneakers",
    category: "Footwear",
    price: "79",
    stock: "24",
    status: "Active",
    brand: "EcoWear",
    sku: "ECO-FT-1001",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Comfortable eco-friendly sneakers for daily wear.",
    fullDescription:
      "These eco sneakers are designed for comfort, style, and durability. Perfect for daily wear with lightweight material and premium cushioning.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", formData);
  };

  return (
    <div className="admin-edit-product-page">
      <section className="admin-edit-product-hero">
        <div>
          <span className="section-mini-badge">Catalog management</span>
          <h1>Edit Product</h1>
          <p>
            Update product information, pricing, stock, image, and publishing
            status.
          </p>
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
              <div className="admin-form-card-header">
                <h2>Basic Information</h2>
                <p>Edit the main product details.</p>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-field full-span">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="admin-form-field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Footwear">Footwear</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Home">Home</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="admin-form-field">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="admin-form-field">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                  />
                </div>

                <div className="admin-form-field">
                  <label>SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Enter SKU"
                  />
                </div>
              </div>
            </section>

            <section className="admin-form-card">
              <div className="admin-form-card-header">
                <h2>Pricing & Inventory</h2>
                <p>Update product price and available stock.</p>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-field">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                  />
                </div>

                <div className="admin-form-field">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>
            </section>

            <section className="admin-form-card">
              <div className="admin-form-card-header">
                <h2>Description</h2>
                <p>Edit short and detailed product descriptions.</p>
              </div>

              <div className="admin-form-grid">
                <div className="admin-form-field full-span">
                  <label>Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write short description"
                  ></textarea>
                </div>

                <div className="admin-form-field full-span">
                  <label>Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write full product description"
                  ></textarea>
                </div>
              </div>
            </section>
          </div>

          <aside className="admin-edit-product-side">
            <section className="admin-form-card">
              <div className="admin-form-card-header">
                <h2>Product Image</h2>
                <p>Update image URL and preview.</p>
              </div>

              <div className="admin-form-field">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                />
              </div>

              <div className="admin-product-image-preview">
                {formData.image ? (
                  <img src={formData.image} alt="Product preview" />
                ) : (
                  <div className="admin-product-image-placeholder">
                    No image preview
                  </div>
                )}
              </div>
            </section>

            <section className="admin-form-card">
              <div className="admin-form-card-header">
                <h2>Actions</h2>
                <p>Save updates or remove this product.</p>
              </div>

              <div className="admin-publish-actions">
                <Link to="/admin/products" className="cancel-btn-ui">
                  Cancel
                </Link>
                <button type="submit" className="save-btn-ui">
                  Update Product
                </button>
                <button type="button" className="admin-delete-btn full-delete-btn">
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

export default AdminEditProductPage;