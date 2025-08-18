import React from "react";
import { BsHouse, BsPerson, BsShare } from "react-icons/bs"; 

const SidebarNav = ({ active, setActive }) => {
  return (
    <nav className="p-3 flex-grow-1">
      <ul className="gap-2 nav nav-pills flex-column">
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
            href="/student"
            
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
