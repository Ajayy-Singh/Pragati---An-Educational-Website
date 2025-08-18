import React, { useState } from "react";
import AddSubject from "../AddSubject";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AdminActions = ({ selectedAction }) => {
  const [date, setDate] = useState(new Date());


  const schedules = {
    "2025-08-18": ["Team Meeting - 10:00 AM", "Student Review - 2:00 PM"],
    "2025-08-19": ["Subject Allocation - 11:00 AM", "Admin Report - 4:00 PM"],
  };

  const formattedDate = date.toISOString().split("T")[0];
  const todaySchedules = schedules[formattedDate] || ["No schedules for this day"];

  const renderContent = () => {
    switch (selectedAction) {
      case "dashboard":
        return (
          <div>
            {/* 1. Admin Profile */}
            <div className="d-flex align-items-center mb-4">
              <img
                src="https://i.pravatar.cc/60"
                alt="Admin"
                className="rounded-circle me-3"
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <h5 className="mb-0 fw-bold">Admin</h5>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>

            {/* 2. Calendar */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Select Date</h6>
              <Calendar value={date} onChange={setDate} />
            </div>

            {/* 3. Schedules */}
            <div>
              <h6 className="fw-semibold mb-2">
                Schedules for {date.toDateString()}
              </h6>
              <ul className="list-group">
                {todaySchedules.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "manageResources":
        return (
          <div>
            {/* 1. Admin Profile */}
            <div className="d-flex align-items-center mb-4">
              <img
                src="https://i.pravatar.cc/60"
                alt="Admin"
                className="rounded-circle me-3"
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <h5 className="mb-0 fw-bold">Admin</h5>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>

            {/* 2. Calendar */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Select Date</h6>
              <Calendar value={date} onChange={setDate} />
            </div>

            {/* 3. Schedules */}
            <div>
              <h6 className="fw-semibold mb-2">
                Schedules for {date.toDateString()}
              </h6>
              <ul className="list-group">
                {todaySchedules.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "logout":
        return (
          <div>
            {/* 1. Admin Profile */}
            <div className="d-flex align-items-center mb-4">
              <img
                src="https://i.pravatar.cc/60"
                alt="Admin"
                className="rounded-circle me-3"
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <h5 className="mb-0 fw-bold">Admin</h5>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>

            {/* 2. Calendar */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Select Date</h6>
              <Calendar value={date} onChange={setDate} />
            </div>

            {/* 3. Schedules */}
            <div>
              <h6 className="fw-semibold mb-2">
                Schedules for {date.toDateString()}
              </h6>
              <ul className="list-group">
                {todaySchedules.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return (
          <div>
            {/* 1. Admin Profile */}
            <div className="d-flex align-items-center mb-4">
              <img
                src="https://i.pravatar.cc/60"
                alt="Admin"
                className="rounded-circle me-3"
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <h5 className="mb-0 fw-bold">Admin</h5>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>

            {/* 2. Calendar */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Select Date</h6>
              <Calendar value={date} onChange={setDate} />
            </div>

            {/* 3. Schedules */}
            <div>
              <h6 className="fw-semibold mb-2">
                Schedules for {date.toDateString()}
              </h6>
              <ul className="list-group">
                {todaySchedules.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
    }
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default AdminActions;
