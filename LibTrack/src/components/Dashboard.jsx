import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

const Dashboard = () => {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="min-vh-100 d-flex">
      <div className="sidebar">
        <h2>LibTracker</h2>
        <nav className="nav flex-column">
          <Link to="/dashboard" className="nav-link text-white">
            <i className="bi bi-house-door"></i> Dashboard
          </Link>
          <Link to="/dashboard/employee" className="nav-link text-white">
            <i className="bi bi-book"></i> Book details
          </Link>
          <Link to="/dashboard/category" className="nav-link text-white">
            <i className="bi bi-grid-1x2"></i> Genre
          </Link>
          <Link to="/dashboard/profile" className="nav-link text-white">
            <i className="bi bi-person"></i> Members
          </Link>
          <Link to="/dashboard/lending" className="nav-link text-white">
            <i className="bi bi-arrow-left-right"></i> Lending
          </Link>
          <Link to="/dashboard/staff" className="nav-link text-white">
            <i className="bi bi-people"></i> Staff
          </Link>
          <Link to="/" onClick={handleLogout} className="nav-link text-white">
            <i className="bi bi-box-arrow-right"></i> Logout
          </Link>
        </nav>
      </div>
      <div className="main-content col p-0 m-0">
        <div className="header p-2 d-flex justify-content-center shadow">
          <h4>Welcome to LibTracker</h4>
        </div>
        <div className="page-content p-4">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


