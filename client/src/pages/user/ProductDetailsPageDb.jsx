import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { fetchProductById } from "../../services/productService";
import { useCart } from "../../hooks/useCart";

function ProductDetailsPageDb() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    let isActive = true;

    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchProductById(id);

        if (!isActive) {
          return;
        }

        setProduct(response.product);
      } catch (apiError) {
        if (!isActive) {
          return;
        }

        setError(apiError.response?.data?.message || "Unable to load product");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  };

  if (loading) {
    return <Loader message="Loading product details..." />;
  }

  if (!product) {
    return (
      <main>
        <h2>Product not found</h2>
        <p>{error || "We couldn't find that product."}</p>
        <Link to="/products" className="button button-secondary">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="section-group product-detail">
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: "320px",
            width: "100%",
            borderRadius: "16px",
            marginBottom: "1rem",
          }}
        />
        <h2>{product.name}</h2>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <strong>${product.price.toFixed(2)}</strong>
        <p>Rating: {product.rating} / 5</p>
        <p>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>

        <div className="button-row">
          <button className="button button-primary" onClick={handleAddToCart}>
            Add to cart
          </button>
          <button className="button button-secondary">Add to wishlist</button>
        </div>

        <h3>Features</h3>
        <ul>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <Link to="/products" className="button button-link">
          Back to products
        </Link>
      </section>
    </main>
  );
}

export default ProductDetailsPageDb;
