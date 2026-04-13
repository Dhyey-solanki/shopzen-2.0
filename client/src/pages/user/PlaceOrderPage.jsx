import { useState } from "react";
import { useNavigate } from "react-router-dom";

const orderItems = [
  { name: "Eco Sneakers", price: 79, quantity: 1 },
  { name: "Cozy Hoodie", price: 59, quantity: 2 },
];

function PlaceOrderPage() {
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  function handlePlaceOrder() {
    setIsPlacing(true);
    setTimeout(() => navigate("/order-success"), 600);
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main>
      <section className="section-group place-order-page">
        <h2>Review your order</h2>
        <div className="order-summary">
          {orderItems.map((item) => (
            <div key={item.name} className="order-line-item">
              <span>{item.name} × {item.quantity}</span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
          <div className="order-line-item order-total">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </div>
        <button onClick={handlePlaceOrder} className="button button-primary" disabled={isPlacing}>
          {isPlacing ? "Placing order..." : "Place order"}
        </button>
      </section>
    </main>
  );
}

export default PlaceOrderPage;
