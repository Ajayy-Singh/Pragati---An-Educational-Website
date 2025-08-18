import React from "react";
import { BsBoxArrowRight } from "react-icons/bs";

const SidebarFooter = () => {
  return (
    <div className="p-3 border-top border-secondary">
      <button className="btn btn-outline-light w-100 d-flex align-items-center gap-2">
        <BsBoxArrowRight /> Logout
      </button>
    </div>
  );
};

export default SidebarFooter;
