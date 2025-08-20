import React, { useState } from "react";
import AdminSidebar from "./adminPage/AdminSidebar";
import AdminContent from "./adminPage/AdminContent";
import AdminActions from "./adminPage/AdminActions";

const AdminPanel = () => {
  const [selectedAction, setSelectedAction] = useState("dashboard");

  return (
    <div
      className="d-flex"
      style={{
        height: "100vh", // Full screen height
        overflow: "hidden", // Prevent outer scroll
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "250px",
          flexShrink: 0,
          background: "#f8f9fa",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Hide scrollbar for Chrome/Safari */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <AdminSidebar setSelectedAction={setSelectedAction} />
      </div>

      {/* Middle Content */}
      <div
        style={{
          flexGrow: 1,
          minWidth: 0,
          overflowY: "auto",
          padding: "20px",
          background: "#fff",
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
        <AdminContent
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          width: "315px",
          flexShrink: 0,
          background: "#f1f1f1",
          borderLeft: "1px solid #ddd",
          padding: "10px",
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
        <AdminActions setSelectedAction={setSelectedAction} />
        <p>Some extra details can go here.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
