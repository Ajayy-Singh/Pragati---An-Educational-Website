import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ParentDashboard from './components/parents/ParentDashboard';
import Resourse from './pages/Resourse';
import SubjectDetails from './components/subjects/SubjectsDetails';
import ResourceList from './components/ResourseList';
import BooksList from "./components/BooksList";
import NotesList from './components/NotesList';
import PapersList from './components/PapersList';
import AdminPanel from './components/adminPanel/AdminPanel';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/resourse' element={<Resourse/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/teacher" element={<TeacherDashboard/>} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/subjects/:subjectName" element={<SubjectDetails />} />
        <Route path="/subjects/:subjectName/:type" element={<ResourceList />} />
        <Route path="/subjects/:subjectName/books" element={<BooksList />} />
        <Route path="/subjects/:subjectName/notes" element={<NotesList />} />
        <Route path="/subjects/:subjectName/papers" element={<PapersList />} />
        <Route path='/admin' element={<AdminPanel/>} />

      </Routes>
  );
}

export default App;