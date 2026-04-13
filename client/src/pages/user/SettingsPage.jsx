import { useState } from "react";
import { Link } from "react-router-dom";

function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    darkMode: false,
    twoFactorAuth: true,
    language: "English",
  });

  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved settings:", settings);
  };

  return (
    <div className="settings-page">
      <section className="settings-hero">
        <div>
          <span className="section-mini-badge">Preferences & security</span>
          <h1>Settings</h1>
          <p>
            Manage your notifications, account security, app preferences, and
            privacy controls.
          </p>
        </div>

        <div className="settings-top-actions">
          <Link to="/profile" className="secondary-btn">
            Back to Profile
          </Link>
        </div>
      </section>

      <form className="settings-form-wrap" onSubmit={handleSave}>
        <section className="settings-card">
          <div className="settings-card-header">
            <h2>Notifications</h2>
            <p>Choose how you want to receive updates.</p>
          </div>

          <div className="settings-list">
            <div className="settings-item">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive general account updates by email.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${
                  settings.emailNotifications ? "toggle-on" : ""
                }`}
                onClick={() => handleToggle("emailNotifications")}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-item">
              <div>
                <h3>SMS Notifications</h3>
                <p>Get important alerts by SMS.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${
                  settings.smsNotifications ? "toggle-on" : ""
                }`}
                onClick={() => handleToggle("smsNotifications")}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-item">
              <div>
                <h3>Order Updates</h3>
                <p>Receive delivery and order status updates.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${
                  settings.orderUpdates ? "toggle-on" : ""
                }`}
                onClick={() => handleToggle("orderUpdates")}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-item">
              <div>
                <h3>Promotional Emails</h3>
                <p>Receive discounts, offers, and product recommendations.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${
                  settings.promotionalEmails ? "toggle-on" : ""
                }`}
                onClick={() => handleToggle("promotionalEmails")}
              >
                <span></span>
              </button>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <h2>Security</h2>
            <p>Keep your account protected.</p>
          </div>

          <div className="settings-list">
            <div className="settings-item">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of protection to your account.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${
                  settings.twoFactorAuth ? "toggle-on" : ""
                }`}
                onClick={() => handleToggle("twoFactorAuth")}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-link-box">
              <div>
                <h3>Change Password</h3>
                <p>Update your current password regularly for better security.</p>
              </div>
              <Link to="/change-password" className="card-secondary-btn">
                Change
              </Link>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <h2>Preferences</h2>
            <p>Customize your app experience.</p>
          </div>

          <div className="settings-preference-grid">
            <div className="settings-field">
              <label>Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleSelectChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Gujarati">Gujarati</option>
              </select>
            </div>

            <div className="settings-item compact-item">
              <div>
                <h3>Dark Mode</h3>
                <p>Switch between light and dark theme.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${settings.darkMode ? "toggle-on" : ""}`}
                onClick={() => handleToggle("darkMode")}
              >
                <span></span>
              </button>
            </div>
          </div>
        </section>

        <section className="settings-danger-card">
          <div>
            <h2>Danger Zone</h2>
            <p>
              Deactivating your account will disable access until you sign in
              again.
            </p>
          </div>

          <button type="button" className="danger-btn-ui">
            Deactivate Account
          </button>
        </section>

        <div className="settings-actions">
          <button type="submit" className="save-btn-ui">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;