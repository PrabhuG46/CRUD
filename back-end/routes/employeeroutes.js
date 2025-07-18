const express = require("express");
const router = express.Router();

// Employee Model
let Employee = require("../models/Employee");

// CREATE Employee
router.route("/create-employee").post(async (req, res, next) => {
  try {
    const result = await Employee.create(req.body);
    res.json({
      data: result,
      message: "Employee successfully added!",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

// READ All Employees
router.route("/").get(async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json({
      data: employees,
      message: "All employees retrieved successfully!",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

// READ Single Employee
router.route("/edit-employee/:id").get(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json({
      data: employee,
      message: "Employee retrieved successfully!",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

// UPDATE Employee
router.route("/update-employee/:id").put(async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({
      data: employee,
      message: "Employee updated successfully!",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

// DELETE Employee
router.route("/delete-employee/:id").delete(async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({
      message: "Employee deleted successfully!",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;