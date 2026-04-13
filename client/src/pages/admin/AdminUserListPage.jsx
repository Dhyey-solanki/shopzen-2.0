import { useMemo, useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Yuvansh Suthar",
    email: "yuvansh@example.com",
    role: "Admin",
    status: "Active",
    joined: "12 Apr 2026",
    orders: 18,
  },
  {
    id: 2,
    name: "Aarav Patel",
    email: "aarav@example.com",
    role: "User",
    status: "Active",
    joined: "08 Apr 2026",
    orders: 6,
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "User",
    status: "Blocked",
    joined: "03 Apr 2026",
    orders: 3,
  },
  {
    id: 4,
    name: "Rohan Mehta",
    email: "rohan@example.com",
    role: "User",
    status: "Active",
    joined: "28 Mar 2026",
    orders: 11,
  },
];

function AdminUserListPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    let filtered = [...usersData];

    if (roleFilter !== "All") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (search.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, roleFilter]);

  return (
    <div className="admin-user-page">
      <section className="admin-user-hero">
        <div>
          <span className="section-mini-badge">User management</span>
          <h1>User List</h1>
          <p>
            View all registered users, manage their roles, and control account
            access from one place.
          </p>
        </div>
      </section>

      <section className="admin-user-toolbar">
        <div className="admin-user-search">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-user-filter">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </section>

      <section className="admin-user-table-card">
        <div className="admin-user-table-head">
          <h2>All Users</h2>
          <p>{filteredUsers.length} users found</p>
        </div>

        <div className="admin-user-list">
          {filteredUsers.map((user) => (
            <div key={user.id} className="admin-user-row">
              <div className="admin-user-main">
                <div className="admin-user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="admin-user-meta">
                <div className="admin-user-meta-box">
                  <span>Role</span>
                  <strong>{user.role}</strong>
                </div>

                <div className="admin-user-meta-box">
                  <span>Status</span>
                  <strong
                    className={
                      user.status === "Active"
                        ? "user-status-active"
                        : "user-status-blocked"
                    }
                  >
                    {user.status}
                  </strong>
                </div>

                <div className="admin-user-meta-box">
                  <span>Orders</span>
                  <strong>{user.orders}</strong>
                </div>

                <div className="admin-user-meta-box">
                  <span>Joined</span>
                  <strong>{user.joined}</strong>
                </div>
              </div>

              <div className="admin-user-actions">
                <button className="card-secondary-btn">Edit</button>
                <button className="admin-warning-btn">
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
                <button className="admin-delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminUserListPage;