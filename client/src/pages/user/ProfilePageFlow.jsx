import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchMyOrders } from "../../services/orderService";

const recentActivity = [
  "Placed a new order",
  "Updated profile details",
  "Saved account settings",
  "Added a delivery address",
];

function ProfilePageFlow() {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadOrders = async () => {
      try {
        const response = await fetchMyOrders();

        if (isActive) {
          setOrderCount(response.orders?.length || 0);
        }
      } catch (_error) {
        if (isActive) {
          setOrderCount(0);
        }
      }
    };

    loadOrders();

    return () => {
      isActive = false;
    };
  }, []);

  const displayName = user?.name || "Customer";
  const displayEmail = user?.email || "Not available";
  const displayPhone = user?.phone || "Not added yet";
  const displayRole = user?.role === "admin" ? "Admin" : "Customer";
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "Recently";
  const location = useMemo(() => {
    if (!user?.address?.line1) {
      return "Address not added";
    }

    return [user.address.line1, user.address.city, user.address.state]
      .filter(Boolean)
      .join(", ");
  }, [user]);

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero-left">
          <div className="profile-avatar">{displayName.charAt(0).toUpperCase()}</div>

          <div>
            <span className="section-mini-badge">Account overview</span>
            <h1>{displayName}</h1>
            <p>{displayEmail}</p>

            <div className="profile-top-actions">
              <Link to="/profile/edit" className="primary-btn">
                Edit Profile
              </Link>
              <Link to="/settings" className="secondary-btn">
                Settings
              </Link>
            </div>
          </div>
        </div>

        <div className="profile-summary-grid">
          <div className="profile-summary-card">
            <h3>{orderCount}</h3>
            <p>Total Orders</p>
          </div>

          <div className="profile-summary-card">
            <h3>{user?.settings?.language || "English"}</h3>
            <p>Preferred Language</p>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        <div className="profile-main-card">
          <div className="profile-section-header">
            <h2>Personal information</h2>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-box">
              <p>Full Name</p>
              <strong>{displayName}</strong>
            </div>

            <div className="profile-info-box">
              <p>Email Address</p>
              <strong>{displayEmail}</strong>
            </div>

            <div className="profile-info-box">
              <p>Phone Number</p>
              <strong>{displayPhone}</strong>
            </div>

            <div className="profile-info-box">
              <p>Role</p>
              <strong>{displayRole}</strong>
            </div>

            <div className="profile-info-box">
              <p>Member Since</p>
              <strong>{joined}</strong>
            </div>

            <div className="profile-info-box">
              <p>Gender</p>
              <strong>{user?.gender || "Not added yet"}</strong>
            </div>
          </div>
        </div>

        <div className="profile-side-column">
          <div className="profile-side-card">
            <h2>Default address</h2>
            <p>{location}</p>
            <Link to="/profile/edit" className="card-secondary-btn full-width-btn">
              Manage Address
            </Link>
          </div>

          <div className="profile-side-card">
            <h2>Recent activity</h2>

            <ul className="activity-list">
              {recentActivity.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePageFlow;
