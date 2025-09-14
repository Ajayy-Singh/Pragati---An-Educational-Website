// import React, { useState } from "react";
// import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
// import SubjectModal from "./SubjectModel";

// const AddSubject = () => {
//   const [subjects, setSubjects] = useState([
//     { id: 1, semester: "1st", name: "Mathematics-I", type: "Book", file: "maths1.pdf" },
//     { id: 2, semester: "2nd", name: "Physics", type: "Notes", file: "physics_notes.pdf" },
//     { id: 3, semester: "1st", name: "Chemistry", type: "Book", file: "chemistry.pdf" }
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [newSubject, setNewSubject] = useState({
//     semester: "",
//     name: "",
//     type: "",
//     file: ""
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [selectedSemester, setSelectedSemester] = useState("All");

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewSubject({ ...newSubject, [name]: value });
//   };

//   // Open modal in Add mode
//   const handleAddClick = () => {
//     setIsEdit(false);
//     setNewSubject({ semester: "", name: "", type: "", file: "" });
//     setShowModal(true);
//   };

//   // Open modal in Edit mode
//   const handleEdit = (id) => {
//     const subjectToEdit = subjects.find((sub) => sub.id === id);
//     setIsEdit(true);
//     setEditId(id);
//     setNewSubject(subjectToEdit);
//     setShowModal(true);
//   };

//   // Save Subject (Add or Edit)
//   const handleSave = () => {
//     if (!newSubject.semester || !newSubject.name || !newSubject.type || !newSubject.file) {
//       alert("Please fill all fields!");
//       return;
//     }

//     if (isEdit) {
//       setSubjects(
//         subjects.map((sub) =>
//           sub.id === editId ? { ...sub, ...newSubject } : sub
//         )
//       );
//     } else {
//       setSubjects([...subjects, { id: subjects.length + 1, ...newSubject }]);
//     }

//     setShowModal(false);
//     setNewSubject({ semester: "", name: "", type: "", file: "" });
//   };

//   // Delete subject
//   const handleDelete = (id) => {
//     setSubjects(subjects.filter((sub) => sub.id !== id));
//   };

//   // Filter subjects based on semester
//   const filteredSubjects =
//     selectedSemester === "All"
//       ? subjects
//       : subjects.filter((sub) => sub.semester === selectedSemester);

//   return (
//     <Container className="mt-3">
//       {/* Heading, Filter & Add Button */}
//       <Row className="align-items-center mb-3">
//         <Col>
//           <h2 className="mb-0">📚 Resources</h2>
//         </Col>
//         <Col md="4">
//           <Form.Select
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//           >
//             <option value="All">All Semesters</option>
//             <option value="1st">1st Semester</option>
//             <option value="2nd">2nd Semester</option>
//             <option value="3rd">3rd Semester</option>
//             <option value="4th">4th Semester</option>
//             <option value="5th">5th Semester</option>
//             <option value="6th">6th Semester</option>
//             <option value="7th">7th Semester</option>
//             <option value="8th">8th Semester</option>
//           </Form.Select>
//         </Col>
//         <Col className="text-end">
//           <Button variant="primary" onClick={handleAddClick}>
//             ➕ Add Subject / PDF
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           {/* Subjects Table */}
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Semester</th>
//                 <th>Subject Name</th>
//                 <th>Type</th>
//                 <th>File</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSubjects.length > 0 ? (
//                 filteredSubjects.map((sub) => (
//                   <tr key={sub.id}>
//                     <td>{sub.id}</td>
//                     <td>{sub.semester}</td>
//                     <td>{sub.name}</td>
//                     <td>{sub.type}</td>
//                     <td>{sub.file}</td>
//                     <td>
//                       <Button
//                         variant="warning"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleEdit(sub.id)}
//                       >
//                         ✏️ Edit
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleDelete(sub.id)}
//                       >
//                         ❌ Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     No subjects found for this semester.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Reusable Add/Edit Modal */}
//       <SubjectModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         handleSave={handleSave}
//         subjectData={newSubject}
//         handleChange={handleChange}
//         isEdit={isEdit}
//       />
//     </Container>
//   );
// };

// export default AddSubject;

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import SubjectModal from "./SubjectModel"; // agar filename alag ho to path change karo
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

const AddSubject = () => {
  const { token } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({
    semester: "",
    name: "",
    type: "",
    file: null, // file object
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("All");

  // Fetch subjects from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/materials",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubjects(data);
      } catch (error) {
        console.error(
          "Error fetching materials:",
          error.response?.data || error.message
        );
      }
    };
    if (token) fetchMaterials();
  }, [token]);

  // Safe handleChange (works for text inputs and file input)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      if (files && files.length > 0)
        setNewSubject((s) => ({ ...s, file: files[0] }));
      else setNewSubject((s) => ({ ...s, file: null }));
    } else {
      setNewSubject((s) => ({ ...s, [name]: value }));
    }
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setNewSubject({ semester: "", name: "", type: "", file: null });
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const subjectToEdit = subjects.find((sub) => sub._id === id);
    if (!subjectToEdit) return;
    setIsEdit(true);
    setEditId(id);
    setNewSubject({
      semester: subjectToEdit.semester || "",
      name: subjectToEdit.title || subjectToEdit.name || "",
      type: subjectToEdit.type || "",
      file: null, // user can optionally choose a new file
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    // On create: file is required (because schema requires fileUrl)
    if (!newSubject.semester || !newSubject.name || !newSubject.type) {
      alert("Please fill semester, name and type.");
      return;
    }
    if (!isEdit && !newSubject.file) {
      alert("Please choose a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newSubject.name);
      // append subject too so backend gets it (safe)
      formData.append("subject", newSubject.name);
      formData.append("semester", newSubject.semester);
      formData.append("type", newSubject.type);
      // only append file if user selected one (avoid sending string "null")
      if (newSubject.file) formData.append("file", newSubject.file);

      let response;
      if (isEdit) {
        response = await axios.put(
          `http://localhost:5000/api/materials/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSubjects((prev) =>
          prev.map((sub) =>
            sub._id === editId ? response.data.updatedMaterial : sub
          )
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/materials/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSubjects((prev) => [...prev, response.data.newMaterial]);
      }

      setShowModal(false);
      setNewSubject({ semester: "", name: "", type: "", file: null });
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      console.error(
        "Error saving material:",
        error.response?.data || error.message
      );
      alert("Failed to save material! See console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects((prev) => prev.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error(
        "Error deleting material:",
        error.response?.data || error.message
      );
      alert("Failed to delete material!");
    }
  };

  const filteredSubjects =
    selectedSemester === "All"
      ? subjects
      : subjects.filter((sub) => sub.semester === selectedSemester);

  return (
    <Container className="mt-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>📚 Resources</h2>
        </Col>
        <Col md="4">
          <Form.Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="All">All Semesters</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="3rd">3rd Semester</option>
            <option value="4th">4th Semester</option>
            <option value="5th">5th Semester</option>
            <option value="6th">6th Semester</option>
            <option value="7th">7th Semester</option>
            <option value="8th">8th Semester</option>
          </Form.Select>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAddClick}>
            ➕ Add Subject / PDF
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Semester</th>
                <th>Subject Name</th>
                <th>Type</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub, index) => (
                  <tr key={sub._id || index}>
                    <td>{index + 1}</td>
                    <td>{sub.semester || "-"}</td>
                    <td>{sub.title || sub.name}</td>
                    <td>{sub.type || "N/A"}</td>
                    <td>
                      {sub.fileUrl ? (
                        <a href={`http://localhost:5000${sub.fileUrl}`} target="_blank" rel="noopener noreferrer">
                          {sub.fileUrl.split("/").pop()}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(sub._id)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(sub._id)}
                      >
                        ❌ Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No subjects found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <SubjectModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        subjectData={newSubject}
        handleChange={handleChange}
        isEdit={isEdit}
      />
    </Container>
  );
};

export default AddSubject;
