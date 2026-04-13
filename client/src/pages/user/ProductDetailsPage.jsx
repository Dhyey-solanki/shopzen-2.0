import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const products = [
  { id: "p1", title: "Eco Sneakers", price: 79, category: "Footwear", description: "Lightweight sneakers made from recycled materials.", details: ["Breathable knit upper", "Cushioned midsole", "Sustainable design"] },
];

function ProductDetailsPage() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === id), [id]);

  if (!product) {
    return (
      <main>
        <h2>Product not found</h2>
        <p>We couldn't find that product.</p>
        <Link to="/products" className="button button-secondary">Back to products</Link>
      </main>
    );
  }

  return (
    <main>
      <section className="section-group product-detail">
        <h2>{product.title}</h2>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <strong>${product.price.toFixed(2)}</strong>
        <div className="button-row">
          <button className="button button-primary">Add to cart</button>
          <button className="button button-secondary">Add to wishlist</button>
        </div>
        <h3>Features</h3>
        <ul>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <Link to="/products" className="button button-link">Back to products</Link>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
