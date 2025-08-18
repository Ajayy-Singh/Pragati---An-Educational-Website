import React from "react";
import { BsX } from "react-icons/bs";

const SidebarHeader = ({ onClose }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
      <span className="fs-4 fw-bold">Pragati</span>
      <button className="btn btn-sm btn-outline-light" onClick={onClose}>
        <BsX size={20} />
      </button>
    </div>
  );
};

export default SidebarHeader;
