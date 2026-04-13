import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { updateMyProfile } from "../../services/userService";

function EditProfilePageFlow() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "Male",
    dob: user?.dob ? new Date(user.dob).toISOString().slice(0, 10) : "",
    address: user?.address?.line1 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData({
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "Male",
      dob: user?.dob ? new Date(user.dob).toISOString().slice(0, 10) : "",
      address: user?.address?.line1 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await updateMyProfile({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob || null,
        address: {
          line1: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      });

      updateUser(response.user);
      navigate("/profile");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-profile-page">
      <section className="edit-profile-hero">
        <div className="edit-profile-hero-left">
          <div className="edit-profile-avatar">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <span className="section-mini-badge">Manage your account</span>
            <h1>Edit profile</h1>
            <p>Update your personal details and shipping information.</p>
          </div>
        </div>

        <div className="edit-profile-top-actions">
          <Link to="/profile" className="secondary-btn">
            Back to Profile
          </Link>
        </div>
      </section>

      <form className="edit-profile-form-card" onSubmit={handleSubmit}>
        <div className="edit-profile-section">
          <div className="edit-profile-section-header">
            <h2>Personal information</h2>
            <p>Keep your account details updated.</p>
          </div>

          <div className="edit-profile-grid">
            <div className="edit-profile-field">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="edit-profile-field">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="edit-profile-field">
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="edit-profile-field">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="edit-profile-field">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="edit-profile-section">
          <div className="edit-profile-section-header">
            <h2>Address details</h2>
            <p>This address can be used for delivery.</p>
          </div>

          <div className="edit-profile-grid">
            <div className="edit-profile-field full-span">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="edit-profile-field">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="edit-profile-field">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} />
            </div>

            <div className="edit-profile-field">
              <label>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
            </div>
          </div>
        </div>

        {error ? <p>{error}</p> : null}

        <div className="edit-profile-actions">
          <Link to="/profile" className="cancel-btn-ui">
            Cancel
          </Link>
          <button type="submit" className="save-btn-ui" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePageFlow;
