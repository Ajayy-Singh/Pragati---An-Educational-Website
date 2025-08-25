import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// Import all the components we've converted
import Sidebar from './StudentDashboard/Sidebar';
import Header from './StudentDashboard/Header';
import DashboardHome from './StudentDashboard/DashboardHome';
import MyCourses from './StudentDashboard/MyCourses';
import Grades from './StudentDashboard/Grades';
import Profile from './StudentDashboard/Profile';

// Import mock data
import { initialUser, allCourses } from './StudentDashboard/mockData';
import { 
    stats, 
    deadlines, 
    grades, 
    notifications 
} from './StudentDashboard/mockData';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
// const {user} = useContext(AuthContext);


// --- MAIN APP COMPONENT ---
export default function StudentDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [user, setUser] = useState(initialUser);
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState(allCourses);

    const navigate = useNavigate();

    // This state management logic remains unchanged
    useEffect(() => {
        if (activeTab === 'My Courses' && searchTerm) {
            const filtered = allCourses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setCourses(filtered);
        } else {
            setCourses(allCourses);
        }
    }, [searchTerm, activeTab]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            alert("SignIn Required")
            navigate('/')
        }
    })

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <DashboardHome user={user} />;
            case 'My Courses':
                return <MyCourses courses={courses} />;
            case 'Grades':
                return <Grades />;
            case 'Profile':
                return <Profile user={user} setUser={setUser} />;
            default:
                return <DashboardHome user={user} />;
        }
    };

    return (
        <div className="d-flex bg-light" style={{ minHeight: '100vh' }}>
            <Sidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
            
            <div className="d-flex flex-column flex-grow-1" style={{ overflow: 'hidden' }}>
                <Header 
                    user={user} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />
                <main className="p-4 flex-grow-1 p-lg-5" style={{ overflowY: 'auto' }}>
                    {/* Container fluid="xxl" is the closest match to Tailwind's max-w-7xl */}
                    <Container fluid="xxl">
                        {renderContent()}
                    </Container>
                </main>
            </div>
        </div>
    );
}