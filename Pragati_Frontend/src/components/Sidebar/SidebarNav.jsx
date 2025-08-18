import React from "react";
import { BsHouse, BsPerson, BsGear } from "react-icons/bs";

const SidebarNav = ({ active, setActive }) => {
  return (
    <nav className="flex-grow-1 p-3">
      <ul className="nav nav-pills flex-column gap-2">
        <li className="nav-item">
          <a
            href="#home"
            className={`nav-link d-flex align-items-center gap-2 ${
              active === "home" ? "active" : "text-white"
            }`}
            onClick={() => setActive("home")}
          >
            <BsHouse /> Home
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#profile"
            className={`nav-link d-flex align-items-center gap-2 ${
              active === "profile" ? "active" : "text-white"
            }`}
            onClick={() => setActive("profile")}
          >
            <BsPerson /> Profile
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#settings"
            className={`nav-link d-flex align-items-center gap-2 ${
              active === "settings" ? "active" : "text-white"
            }`}
            onClick={() => setActive("settings")}
          >
            <BsGear /> Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
