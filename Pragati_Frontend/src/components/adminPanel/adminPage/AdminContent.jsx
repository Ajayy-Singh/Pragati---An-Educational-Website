import React from "react";
import { useNavigate } from "react-router-dom";
import stuimg from "../../../assets/images/stuimg.png";
import Subjects from "../../subjects/Subjects";
import AddSubject from "../AddSubject";

const AdminContent = ({
  selectedAction,
  setSelectedAction,
  userName = "Naman",
}) => {
  const navigate = useNavigate();

  // Get current date in format like: Monday, 2 November 2025
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-3" style={{ height: "100%", overflow: "hidden" }}>
      {selectedAction === "dashboard" && (
        <>
          {/* Small Dashboard Heading */}
          <h4
            className="fw-bold text-primary mb-3"
            style={{
              display: "inline-block",
              paddingBottom: "6px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              borderBottom: "3px solid #667eea",
            }}
          >
            Dashboard
          </h4>

          {/* Date */}
          <p className="text-secondary">{currentDate}</p>

          {/* Greeting Container */}
          <div
            className="d-flex justify-content-between align-items-center p-4 mt-3"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              borderRadius: "15px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {/* Left side: Greeting text */}
            <div style={{ maxWidth: "60%" }}>
              <h2>Hello, {userName} 👋</h2>
              <p className="mt-2">
                Welcome back! Hope you're having a great day. Here you can
                manage your resources and keep track of everything easily.
              </p>
            </div>

            {/* Right side: Student illustration */}
            <div>
              <img
                src={stuimg}
                alt="Student at desk"
                style={{ width: "200px", borderRadius: "10px" }}
              />
            </div>
          </div>
        </>
      )}

      {selectedAction === "resources" && (
        <div
          style={{
            display: "grid",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          
          <div
            style={{
              overflowY: "auto",
              background: "#fff",
            }}
          >
            <Subjects />
          </div>

        </div>
      )}

      {selectedAction === "manageResources" && (
        <>
          <AddSubject />
        </>
      )}

      {selectedAction === "logout" && <h3>Logging out...</h3>}
    </div>
  );
};

export default AdminContent;
