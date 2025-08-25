import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './components/student/StudentDashboard';
import Resourse from './pages/Resourse';
import SubjectDetails from './components/subjects/SubjectsDetails';
import ResourceList from './components/ResourseList';
import BooksList from "./components/BooksList";
import NotesList from './components/NotesList';
import PapersList from './components/PapersList';
import AdminPanel from './components/adminPanel/AdminPanel';
import Login from './components/Login';

const App = ()=> {
  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // ⬅️ added

  const handleLogin = async (email, password) => {   // ⬅️ added login handler
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.data.status === 201) {
        localStorage.setItem("token", data.token); // save token
        // setIsLoggedIn(true);
        navigate("/student"); // redirect after login ⬅️ change route if needed

      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {   // ⬅️ added logout handler
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/resourse' element={<Resourse />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ⬅️ Added Login route */}
        <Route path="/login" element={<Login/>} />

        {/* Protected routes example */}
        {/* <Route path="/student" element={isLoggedIn ? <StudentDashboard /> : <Login />} />
       */}
       <Route path='/student' element={<StudentDashboard/>}/>

        <Route path="/subjects/:subjectName" element={<SubjectDetails />} />
        <Route path="/subjects/:subjectName/:type" element={<ResourceList />} />
        <Route path="/subjects/:subjectName/books" element={<BooksList />} />
        <Route path="/subjects/:subjectName/notes" element={<NotesList />} />
        <Route path="/subjects/:subjectName/papers" element={<PapersList />} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
