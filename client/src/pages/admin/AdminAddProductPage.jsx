import { useState } from "react";
import { Link } from "react-router-dom";

function AdminAddProductPage() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product:", formData);
  };

  return (
    <div className="admin-add-product-page">
      <section className="admin-add-product-hero">
        <div>
          <span className="section-mini-badge">Catalog management</span>
          <h1>Add Product</h1>
          <p>
            Create a new product listing with pricing, stock, image, and full
            details.
          </p>
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
              <div className="admin-form-card-header">
                <h2>Basic Information</h2>
                <p>Enter the main product details.</p>
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
                <p>Set product price and stock count.</p>
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
                <p>Add short and detailed product descriptions.</p>
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

          <aside className="admin-add-product-side">
            <section className="admin-form-card">
              <div className="admin-form-card-header">
                <h2>Product Image</h2>
                <p>Add image URL for preview.</p>
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
                <h2>Publish</h2>
                <p>Save this product to your catalog.</p>
              </div>

              <div className="admin-publish-actions">
                <Link to="/admin/products" className="cancel-btn-ui">
                  Cancel
                </Link>
                <button type="submit" className="save-btn-ui">
                  Save Product
                </button>
              </div>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default AdminAddProductPage;