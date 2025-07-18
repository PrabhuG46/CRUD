import React from "react";
import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <img src="https://st3.depositphotos.com/16138592/32063/v/450/depositphotos_320639772-stock-illustration-office-people-team-employees-icon.jpg" alt="Logo" className="logo" />
        <Link to="/" className="navbar-brand">
          Employee Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/create-employee" className="nav-link gradient-button">
                Create Employee
              </Link>
            </li>
            
            <li className="nav-item ms-3">
              <Link to="/employee-list" className="nav-link gradient-button">
                Employee List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
