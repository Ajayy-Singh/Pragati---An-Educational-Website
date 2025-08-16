import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "./Subjects.css";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const sem1Subjects = [
    "Mathematics I",
    "Physics",
    "Chemistry",
    "Programming in C",
    "Electronics",
    "English",
  ];
  const sem2Subjects = [
    "Mathematics II",
    "Data Structures",
    "Digital Logic",
    "OOPS in C++",
    "Discrete Math",
    "Economics",
  ];
  const sem3Subjects = [
    "DBMS",
    "Computer Networks",
    "Operating System",
    "Software Engineering",
    "Java",
    "Computer Graphics",
  ];

  const semesters = [
    { title: "Semester 1", subjects: sem1Subjects },
    { title: "Semester 2", subjects: sem2Subjects },
    { title: "Semester 3", subjects: sem3Subjects },
  ];

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Function to filter subjects
  const filterSubjects = (subjects) => {
    if (!searchTerm) return subjects;
    return subjects.filter((sub) =>
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="container my-5">
      {/* Heading with Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Subjects</h2>

        {/* Search Box */}
        <Form.Control
          type="text"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px" }}
          className="ml-10"
        />
      </div>

      {/* Semester-wise rows */}
      {semesters.map((sem, index) => {
        const filteredSubjects = filterSubjects(sem.subjects);
        if (filteredSubjects.length === 0) return null; // Hide semester if no subjects match

        return (
          <div key={index} className="mb-5">
            <h4 className="text-start mb-3">{sem.title}</h4>

            {/* Scrollable Row */}
            <div className="scroll-container d-flex pb-3">
              {filteredSubjects.map((sub, i) => (
                <div
                  key={i}
                  className="me-3 flex-shrink-0"
                  style={{ width: "220px" }}
                >
                  <Card
                    className="h-100 shadow-sm text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/subjects/${sub}`)} // Navigate to details
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center">
                      <Card.Title className="mb-0">{sub}</Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subjects;
