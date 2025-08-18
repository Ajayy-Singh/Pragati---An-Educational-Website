import React, { useState } from "react";
import AdminSidebar from "./adminPage/AdminSidebar";
import AdminContent from "./adminPage/AdminContent";

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
      <div
        style={{
          width: "250px",
          flexShrink: 0,
          background: "#f1f1f1",
          borderLeft: "1px solid #ddd",
          padding: "15px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <AdminActions selectedAction={selectedAction} />
        <p>Some extra details can go here.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
