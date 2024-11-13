import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";

function Sidebar({ user }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarActive, setSidebarActive] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarActive(!isSidebarActive);

  return (
    <div className={`sidebar-container d-flex flex-column justify-content-between p-3 vh-100 ${isSidebarActive ? "active" : ""}`}>
      {/* Logo Section */}
      <div className="logo-section mb-4">
        <Link to="/" className="text-decoration-none d-flex align-items-center mb-3">
          <img
            src="/img/logo.gif"
            alt="Logo"
            className="logo-image me-2"
            style={{
              width: "215px",
              height: "80px",
              borderRadius: "10px",
              padding: "10px",
              border: "5px solid white",
              backgroundColor: "white",
            }}
          />
        </Link>
        <hr className="divider" />
      </div>

      {/* Menu Section */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item p-1">
          <Link to="/" className="nav-link sidebar-item">
            <i className="bi bi-house me-2"></i> Home
          </Link>
        </li>
        <li className="nav-item p-1">
          <a href="#" className="nav-link sidebar-item" onClick={toggleDropdown}>
            <i className="bi bi-gear me-2"></i> Administrator
          </a>
          {isDropdownOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item p-1">
                <Link to="/document" className="nav-link sidebar-item">Document Management</Link>
              </li>
              <li className="nav-item p-1">
                <Link to="/permission" className="nav-link sidebar-item">Permission Management</Link>
              </li>
              <li className="nav-item p-1">
                <Link to="/reports" className="nav-link sidebar-item">Reports</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item p-1">
          <Link to="/help" className="nav-link sidebar-item">
            <i className="bi bi-question-circle me-2"></i> Help
          </Link>
        </li>
        <li className="nav-item p-1">
          <Link to="/profile" className="nav-link sidebar-item">
            <i className="bi bi-person me-2"></i> Profile
          </Link>
        </li>
      </ul>

      {/* Footer Section */}
      <div className="footer-section mt-auto">
        <hr className="divider" />
        <Link to="/profile" className="footer-link d-flex align-items-center text-decoration-none">
          <img
            src={user?.avatar || "/img/default-avatar.png"}
            alt="Profile"
            className="footer-profile-image me-2"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="user-name">{user ? `${user.firstName} ${user.lastName}` : "User Name"}</span>
        </Link>
      </div>

      {/* Toggle Sidebar Button */}
      <div className="toggle-menu" onClick={toggleSidebar}>
        <i className={`bx ${isSidebarActive ? "bxs-left-arrow" : "bxs-right-arrow"}`}></i>
      </div>
    </div>
  );
}

export default Sidebar;
