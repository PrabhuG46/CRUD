import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeList from "./pages/EmployeeList";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </div>
  );
}

export default App;