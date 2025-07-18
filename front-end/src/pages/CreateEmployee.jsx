import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    empno: "",
    gender: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userForm.name.trim()) newErrors.name = "Name is required";
    if (!userForm.email.trim()) newErrors.email = "Email is required";
    if (!userForm.empno.trim()) newErrors.empno = "Employee number is required";
    if (!userForm.gender.trim()) newErrors.gender = "Gender is required";
    if (!userForm.department.trim())
      newErrors.department = "Department is required";
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios
      .post("http://localhost:4000/employees/create-employee", userForm)
      .then((res) => {
        alert("Employee created successfully!");
        setUserForm({
          name: "",
          email: "",
          empno: "",
          gender: "",
          department: "",
        });
        setErrors({});
        navigate("/employee-list");
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating employee");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "80px" , marginLeft: "420px" ,width: "100%"}}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h3 className="text-primary">Create New Employee</h3>
          <p className="text-secondary">Fill in the details below.</p>
        </div>

        <form onSubmit={onSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={userForm.name}
              onChange={inputsHandler}
              placeholder="Enter name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={userForm.email}
              onChange={inputsHandler}
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Emp No */}
          <div className="mb-3">
            <label className="form-label">Employee Number</label>
            <input
              type="text"
              name="empno"
              className={`form-control ${errors.empno ? "is-invalid" : ""}`}
              value={userForm.empno}
              onChange={inputsHandler}
              placeholder="Enter emp no"
            />
            {errors.empno && (
              <div className="invalid-feedback">{errors.empno}</div>
            )}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userForm.gender === "Male"}
                  onChange={inputsHandler}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userForm.gender === "Female"}
                  onChange={inputsHandler}
                />
                <label className="form-check-label">Female</label>
              </div>

              {errors.gender && (
                <div className="text-danger mt-1">{errors.gender}</div>
              )}
            </div>
          </div>

          {/* Department Dropdown */}
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className={`form-select ${errors.department ? "is-invalid" : ""}`}
              name="department"
              value={userForm.department}
              onChange={inputsHandler}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
              <option value="Production">Production</option>
              <option value="Development">Development</option>
            </select>
            {errors.department && (
              <div className="invalid-feedback">{errors.department}</div>
            )}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
