import { Link } from "react-router-dom";

function OrderSuccessPage() {
  return (
    <main>
      <section className="section-group order-success-page">
        <h2>Order confirmed</h2>
        <p>Thank you! Your order has been placed successfully.</p>
        <p>We will send shipping updates to your email.</p>
        <Link to="/orders" className="button button-primary">
          View orders
        </Link>
      </section>
    </main>
  );
}

export default OrderSuccessPage;
