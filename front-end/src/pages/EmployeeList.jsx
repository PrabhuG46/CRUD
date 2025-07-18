import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee list
  const fetchEmployees = () => {
    axios
      .get("http://localhost:4000/employees")
      .then((res) => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete employee
  const deleteEmployee = (id, name) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (!isConfirmed) return;

    axios
      .delete(`http://localhost:4000/employees/delete-employee/${id}`)
      .then(() => {
        alert(`Employee "${name}" deleted successfully!`);
        fetchEmployees(); // Refresh the list
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center"
        style={{ marginTop: "80px", marginLeft: "300px", width: "100%" }}
      >
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Employee List</h3>
              <Link to="/create-employee" className="btn btn-primary">
                Add Employee
              </Link>
            </div>
            <div className="card-body">
              {employees.length === 0 ? (
                <p className="text-center">No employees found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Employee Number</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee._id}>
                          <td>{employee.name}</td>
                          <td>{employee.email}</td>
                          <td>{employee.empno}</td>
                          <td>{employee.gender}</td>
                          <td>{employee.department}</td>
                          <td>
                            <Link
                              to={`/edit-employee/${employee._id}`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteEmployee(employee._id, employee.name)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
