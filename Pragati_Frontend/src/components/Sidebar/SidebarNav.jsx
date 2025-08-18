import React from "react";
import { BsHouse, BsPerson, BsShare } from "react-icons/bs"; 

const SidebarNav = ({ active, setActive }) => {
  return (
    <nav className="flex-grow-1 p-3">
      <ul className="nav nav-pills flex-column gap-2">
        {/* Home */}
        <li className="nav-item">
          <a
            href="/"
            className={`btn btn-outline-light w-100 d-flex align-items-center gap-2 ${
              active === "Home" ? "active" : "text-dark"
            }`}
            onClick={() => setActive("Home")}
          >
            <BsHouse /> Home
          </a>
        </li>

        {/* Dashboard */}
        <li className="nav-item">
          <a
            href="#Dashboard"
            className={`btn btn-outline-light w-100 d-flex align-items-center gap-2 ${
              active === "Dashboard" ? "active" : "text-dark"
            }`}
            onClick={() => setActive("Dashboard")}
          >
            <BsPerson /> Dashboard
          </a>
        </li>

        {/* Share */}
        <li className="nav-item">
          <button
            className={`btn btn-outline-light w-100 d-flex align-items-center gap-2 ${
              active === "share" ? "active" : "text-dark"
            }`}
            onClick={() => {
              setActive("share");
              if (navigator.share) {
                // Native share API (mobile-friendly)
                navigator
                  .share({
                    title: "Check out this Pragati Platform!",
                    text: "I found this awesome learning platform.",
                    url: window.location.href,
                  })
                  .catch((err) => console.log("Share cancelled", err));
              } else {
                // Fallback for desktop
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
          >
            <BsShare /> Share
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
