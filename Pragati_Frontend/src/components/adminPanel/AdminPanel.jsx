import React, { useState } from "react";
import AdminSidebar from "./adminPage/AdminSidebar";
import AdminContent from "./adminPage/AdminContent";
import AdminActions from "./adminPage/AdminActions";
const AdminPanel = () => {
  const [selectedAction, setSelectedAction] = useState("dashboard");

  return (
    <div className="d-flex">
      {/* Left Sidebar */}
      <div style={{ width: "250px" }}>
        <AdminSidebar setSelectedAction={setSelectedAction} />
      </div>

      {/* Middle Content */}
      <div className="flex-grow-1">
        <AdminContent selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
      </div>

      {/* Right Section */}
      <div style={{ width: "250px" }} className="bg-light p-3">
        <h6>Quick Info</h6>
        <p>Some extra details can go here.</p>
        <AdminActions />
      </div>
    </div>
  );
};

export default AdminPanel;
