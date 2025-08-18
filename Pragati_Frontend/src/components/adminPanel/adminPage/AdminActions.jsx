import React from "react";
import AddSubject from "../AddSubject";

const AdminActions = ({ selectedAction }) => {
  const renderContent = () => {
    switch (selectedAction) {
      case "dashboard":
        return (
          <div className="text-center">
            <h2 className="fw-bold mb-3">Welcome to Admin Dashboard</h2>
            <p className="text-muted">
              Here you can manage resources, subjects, and perform admin tasks.
            </p>
          </div>
        );

      case "manageResources":
        return (
          <div>
            <h3 className="fw-semibold mb-3">Manage Resources</h3>
            <AddSubject />
          </div>
        );

      case "logout":
        return (
          <div className="text-center">
            <h3 className="fw-bold text-danger">Logging out...</h3>
            <p className="text-muted">You will be redirected shortly.</p>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted">
            <p>Please select an action from the sidebar.</p>
          </div>
        );
    }
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default AdminActions;
