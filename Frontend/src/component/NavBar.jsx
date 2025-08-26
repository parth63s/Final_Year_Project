import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import "./NavBar.css"; // custom styles

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      navigate("/", { state: { toast: "Logged out successfully!" } });
    } catch (err) {
      toast.error("Logout failed. Try again.", { position: "top-center" });
      console.error(err);
    }
  };

  return (
    <nav className="navbar bg-dark fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/media/images/logo.svg"
            alt="Logo"
            width="100"
            height="50"
            className="me-2"
          />
        </Link>

        {/* Sidebar Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Sidebar */}
        <div
          className="offcanvas offcanvas-end w-25"
          tabIndex="-1"
          id="sidebarMenu"
        >
          <div className="offcanvas-header  border-bottom">
            <h5 className="offcanvas-title">MOM's Magic &nbsp;</h5>
            <button
              type="button"
              className="btn-close btn-close-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link active" to="/profile">👤 Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/order">🛒 Orders</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/showSubscription">📦 Subscriptions</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-danger"  onClick={handleLogout}>🚪 Logout</Link>
                </li>
              
              
              
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
