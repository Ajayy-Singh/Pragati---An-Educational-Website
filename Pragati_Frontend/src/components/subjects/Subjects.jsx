// import React, { useState } from "react";
// import { Card, Form } from "react-bootstrap";
// import "./Subjects.css";
// import { useNavigate } from "react-router-dom";

// const Subjects = () => {
//   const sem1Subjects = [
//     "Mathematics I",
//     "Physics",
//     "Chemistry",
//     "Programming in C",
//     "Electronics",
//     "English",
//   ];
//   const sem2Subjects = [
//     "Mathematics II",
//     "Data Structures",
//     "Digital Logic",
//     "OOPS in C++",
//     "Discrete Math",
//     "Economics",
//   ];
//   const sem3Subjects = [
//     "DBMS",
//     "Computer Networks",
//     "Operating System",
//     "Software Engineering",
//     "Java",
//     "Computer Graphics",
//   ];

//   const semesters = [
//     { title: "Semester 1", subjects: sem1Subjects },
//     { title: "Semester 2", subjects: sem2Subjects },
//     { title: "Semester 3", subjects: sem3Subjects },
//   ];

//   const handleIsLogin = (sub)=>{
//     const token = localStorage.getItem("token");
//     if(token){
//       navigate(`/subjects/${sub}`)   
//    }
//    else {
//     alert("Login Required")
//    }
//   }

//   // State for search input
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();

//   // Function to filter subjects
//   const filterSubjects = (subjects) => {
//     if (!searchTerm) return subjects;
//     return subjects.filter((sub) =>
//       sub.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   return (
//     <div className="container my-5">
//       {/* Heading with Search */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">Subjects</h2>

//         {/* Search Box */}
//         <Form.Control
//           type="text"
//           placeholder="Search subjects..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: "300px" }}
//           className="ml-10"
//         />
//       </div>

//       {/* Semester-wise rows */}
//       {semesters.map((sem, index) => {
//         const filteredSubjects = filterSubjects(sem.subjects);
//         if (filteredSubjects.length === 0) return null; // Hide semester if no subjects match

//         return (
//           <div key={index} className="mb-5">
//             <h4 className="text-start mb-3">{sem.title}</h4>

//             {/* Scrollable Row */}
//             <div className="scroll-container d-flex pb-3">
//               {filteredSubjects.map((sub, i) => (
//                 <div
//                   key={i}
//                   className="me-3 flex-shrink-0"
//                   style={{ width: "220px" }}
//                 >
//                   <Card
//                     className="h-100 shadow-sm text-center"
//                     style={{ cursor: "pointer" }}
//                     onClick={()=> handleIsLogin(sub)} // Navigate to details
//                   >
//                     <Card.Body className="d-flex align-items-center justify-content-center">
//                       <Card.Title className="mb-0">{sub}</Card.Title>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Subjects;

//updated code
import React, { useState, useEffect, useContext } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import SubjectModal from "../adminPanel/SubjectModel"; // modal for admin add/edit
import "./Subjects.css";

const Subjects = () => {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);
  const role = sessionStorage.getItem("role"); // assume role stored in session
  const navigate = useNavigate();

  // Fetch materials from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/materials", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchMaterials();
  }, [token]);

  // Group materials by semester
  const groupedBySemester = materials.reduce((acc, mat) => {
    if (!acc[mat.semester]) acc[mat.semester] = [];
    acc[mat.semester].push(mat);
    return acc;
  }, {});

  // Filter subjects by search term
  const filterSubjects = (subjects) =>
    subjects.filter((sub) =>
      sub.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Handle viewing a material (any role)
  const handleView = (fileUrl) => {
    window.open(fileUrl.startsWith("http") ? fileUrl : `http://localhost:5000${fileUrl}`, "_blank");
  };

  // Handle admin edit
  const handleEdit = (material) => {
    setIsEdit(true);
    setSelectedMaterial(material);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading materials...
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Header + Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Subjects / Resources</h2>
        <Form.Control
          type="text"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>

      {/* Render semesters */}
      {Object.keys(groupedBySemester).map((sem, index) => {
        const filtered = filterSubjects(groupedBySemester[sem]);
        if (filtered.length === 0) return null;

        return (
          <div key={index} className="mb-5">
            <h4 className="text-start mb-3">Semester {sem}</h4>
            <div className="scroll-container d-flex pb-3 flex-wrap gap-3">
              {filtered.map((mat) => (
                <Card
                  key={mat._id}
                  className="shadow-sm text-center"
                  style={{ width: "220px", cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title className="mb-2">{mat.title}</Card.Title>
                    <p className="text-muted small mb-2">{mat.type}</p>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleView(mat.fileUrl)}
                    >
                      View File
                    </Button>

                    {role === "admin" && (
                      <Button
                        variant="warning"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleEdit(mat)}
                      >
                        Edit
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Admin Add button */}
      {role === "admin" && (
        <div className="text-center mt-4">
          <Button
            onClick={() => {
              setShowModal(true);
              setIsEdit(false);
              setSelectedMaterial(null);
            }}
          >
            ➕ Add New Resource
          </Button>
        </div>
      )}

      {/* Admin modal */}
      {role === "admin" && (
        <SubjectModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={() => window.location.reload()} // reload after add/edit
          subjectData={
            selectedMaterial || { semester: "", name: "", type: "", fileUrl: "" }
          }
          handleChange={() => {}}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default Subjects;
