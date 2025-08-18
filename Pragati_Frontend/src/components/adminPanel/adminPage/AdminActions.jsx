import React from "react";
import AddSubject from "../AddSubject";

const AdminContent = ({ selectedAction }) => {
  return (
    <div className="p-3">
      {selectedAction === "dashboard" && <h2>Welcome to Admin Dashboard</h2>}
      {selectedAction === "manageResources" && <AddSubject />}
      {selectedAction === "logout" && <h3>Logging out...</h3>}
    </div>
  );
};

export default AdminContent;
