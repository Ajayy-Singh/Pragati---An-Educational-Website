import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ParentDashboard from './components/parents/ParentDashboard';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/teacher" element={<TeacherDashboard/>} />
        <Route path="/parent" element={<ParentDashboard />} />

      </Routes>
  );
}

export default App;