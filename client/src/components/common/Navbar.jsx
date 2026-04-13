import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>ShopZen</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart ({itemCount})</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
        {isAdmin ? <Link to="/admin">Admin</Link> : null}
        {isAuthenticated ? (
          <>
            <span>{user?.name}</span>
            <button type="button" className="button button-primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
