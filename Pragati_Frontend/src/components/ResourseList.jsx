// // src/components/ResourceList.jsx
// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { Card, Button } from "react-bootstrap";

// const ResourceList = () => {
//   const { subjectName, type } = useParams();

//   // Dummy Data (replace later with API or DB)
//   const resources = {
//     books: [
//       { title: "Computer Networks", author: "Andrew Tanenbaum", link: "/pdfs/computer-networks.pdf" },
//       { title: "Operating System Concepts", author: "Silberschatz", link: "/pdfs/os-concepts.pdf" }
//     ],
//     notes: [
//       { title: "DBMS Notes", link: "/pdfs/dbms-notes.pdf" },
//       { title: "Compiler Notes", link: "/pdfs/compiler-notes.pdf" }
//     ],
//     papers: [
//       { title: "CN Question Paper 2022", link: "/pdfs/cn-paper.pdf" },
//       { title: "OS Question Paper 2021", link: "/pdfs/os-paper.pdf" }
//     ]
//   };

//   return (
//     <div className="container my-5">
//       <h3 className="fw-bold text-center mb-4">
//         {type.charAt(0).toUpperCase() + type.slice(1)} for {subjectName}
//       </h3>

//       <div className="row">
//         {resources[type]?.map((item, index) => (
//           <div className="col-md-4 mb-3" key={index}>
//             <Card className="shadow-sm">
//               <Card.Body>
//                 <Card.Title>{item.title}</Card.Title>
//                 {type === "books" && <p className="text-muted">Author: {item.author}</p>}
//                 <Button
//                   variant="primary"
//                   onClick={() => window.open(item.link, "_blank")}
//                 >
//                   Open PDF
//                 </Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-4">
//         <Link to={`/subjects/${subjectName}`} className="btn btn-outline-secondary">
//           🔙 Back to {subjectName}
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ResourceList;




// src/components/ResourceList.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const ResourceList = () => {
  const { subjectName, type } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/materials", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Filter by subjectName + type (books, notes, papers etc.)
        const filtered = res.data.filter(
          (mat) =>
            mat.subject.toLowerCase() === subjectName.toLowerCase() &&
            mat.type.toLowerCase() === type.toLowerCase()
        );

        setMaterials(filtered);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [subjectName, type]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="fw-bold text-center mb-4">
        {type.charAt(0).toUpperCase() + type.slice(1)} for {subjectName}
      </h3>

      {materials.length === 0 ? (
        <p className="text-center text-muted">No {type} available for {subjectName}.</p>
      ) : (
        <div className="row">
          {materials.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <p className="text-muted">Semester: {item.semester}</p>
                  <Button
                    variant="primary"
                    onClick={() =>
                      window.open(`http://localhost:5000${item.fileUrl}`, "_blank")
                    }
                  >
                    Open File
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to={`/subjects/${subjectName}`} className="btn btn-outline-secondary">
          🔙 Back to {subjectName}
        </Link>
      </div>
    </div>
  );
};

export default ResourceList;
