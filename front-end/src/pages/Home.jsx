import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="container mt-5"
      style={{
        marginTop: "100px",
        marginLeft: "230px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-8">
            <div className="card-body text-center">
              <h1 className="card-title" style={{ paddingBottom: "10px" }}>
                Welcome to Employee Management Webpage
              </h1>
              <p className="card-text">This is a complete CRUD application</p>

              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Link to="/create-employee" className="btn btn-primary me-md-2">
                  Create Employee
                </Link>
                <Link to="/employee-list" className="btn btn-outline-primary">
                  View Employees
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;