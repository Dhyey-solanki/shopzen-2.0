import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { updateMySettings } from "../../services/userService";

function SettingsPageFlow() {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    darkMode: false,
    twoFactorAuth: true,
    language: "English",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSettings({
      emailNotifications: user?.settings?.emailNotifications ?? true,
      smsNotifications: user?.settings?.smsNotifications ?? false,
      orderUpdates: user?.settings?.orderUpdates ?? true,
      promotionalEmails: user?.settings?.promotionalEmails ?? false,
      darkMode: user?.settings?.darkMode ?? false,
      twoFactorAuth: user?.settings?.twoFactorAuth ?? true,
      language: user?.settings?.language || "English",
    });
  }, [user]);

  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await updateMySettings(settings);
      updateUser(response.user);
      setMessage("Settings saved successfully");
    } catch (_error) {
      setMessage("Unable to save settings");
    } finally {
      setSaving(false);
    }
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
          </div>

          <div className="settings-list">
            {[
              ["emailNotifications", "Email Notifications", "Receive general account updates by email."],
              ["smsNotifications", "SMS Notifications", "Get important alerts by SMS."],
              ["orderUpdates", "Order Updates", "Receive delivery and order status updates."],
              ["promotionalEmails", "Promotional Emails", "Receive discounts, offers, and product recommendations."],
            ].map(([field, title, desc]) => (
              <div key={field} className="settings-item">
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-switch ${settings[field] ? "toggle-on" : ""}`}
                  onClick={() => handleToggle(field)}
                >
                  <span></span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <h2>Security</h2>
          </div>

          <div className="settings-list">
            <div className="settings-item">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of protection to your account.</p>
              </div>
              <button
                type="button"
                className={`toggle-switch ${settings.twoFactorAuth ? "toggle-on" : ""}`}
                onClick={() => handleToggle("twoFactorAuth")}
              >
                <span></span>
              </button>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <h2>Preferences</h2>
          </div>

          <div className="settings-preference-grid">
            <div className="settings-field">
              <label>Language</label>
              <select name="language" value={settings.language} onChange={handleSelectChange}>
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

        {message ? <p>{message}</p> : null}

        <div className="settings-actions">
          <button type="submit" className="save-btn-ui" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPageFlow;
