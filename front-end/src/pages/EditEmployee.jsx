import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    empno: "",
    gender: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/employees/edit-employee/${id}`)
      .then((res) => {
        setUserForm(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

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
    if (!userForm.empno.toString().trim())
      newErrors.empno = "Employee number is required";
    if (!userForm.gender) newErrors.gender = "Gender is required";
    if (!userForm.department) newErrors.department = "Department is required";
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
      .put(`http://localhost:4000/employees/update-employee/${id}`, userForm)
      .then((res) => {
        alert("Employee updated successfully!");
        navigate("/employee-list");
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating employee");
      });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div
      className="container mt-4"
      style={{ marginTop: "100px", marginLeft: "420px" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="card">
            <div className="card-header">
              <h3>Edit Employee</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={userForm.name}
                    onChange={inputsHandler}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={userForm.email}
                    onChange={inputsHandler}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Employee Number</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.empno ? "is-invalid" : ""
                    }`}
                    name="empno"
                    value={userForm.empno}
                    onChange={inputsHandler}
                  />
                  {errors.empno && (
                    <div className="invalid-feedback">{errors.empno}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={userForm.gender === "Male"}
                    onChange={inputsHandler}
                  />{" "}
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={userForm.gender === "Female"}
                    onChange={inputsHandler}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                  Female
                  {errors.gender && (
                    <div className="text-danger" style={{ fontSize: "0.9rem" }}>
                      {errors.gender}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className={`form-select ${
                      errors.department ? "is-invalid" : ""
                    }`}
                    name="department"
                    value={userForm.department}
                    onChange={inputsHandler}
                  >
                    <option value="">Select Department</option>
                    <option value="Hr">HR</option>
                    <option value="Admin">Admin</option>
                    <option value="Production">Production</option>
                    <option value="Development">Development</option>
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">{errors.department}</div>
                  )}
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Update Employee
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/employee-list")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
