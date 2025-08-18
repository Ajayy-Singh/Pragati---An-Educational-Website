import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SubjectModal = ({ show, handleClose, handleSave, subjectData, handleChange, isEdit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "✏️ Edit Subject / PDF" : "➕ Add New Subject / PDF"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Semester</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 1st, 2nd, 3rd"
              name="semester"
              value={subjectData.semester}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject name"
              name="name"
              value={subjectData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={subjectData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Book">Book</option>
              <option value="Notes">Notes</option>
              <option value="Question Paper">Question Paper</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name (e.g., file.pdf)"
              name="file"
              value={subjectData.file}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          {isEdit ? "✅ Update Subject" : "✅ Add Subject"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubjectModal;
