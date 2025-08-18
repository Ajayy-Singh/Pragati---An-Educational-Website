import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// Import all the components we've converted
import Sidebar from './StudentDesFolder/Sidebar';
import Header from './StudentDesFolder/Header';
import DashboardHome from './StudentDesFolder/DashboardHome';
import MyCourses from './StudentDesFolder/MyCourses';
import Grades from './StudentDesFolder/Grades';
import Profile from './StudentDesFolder/Profile';

// Import mock data
import { initialUser, allCourses } from './StudentDesFolder/mockData';
import { 
    stats, 
    deadlines, 
    grades, 
    notifications 
} from './StudentDesFolder/mockData';

// --- MAIN APP COMPONENT ---
export default function StudentDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [user, setUser] = useState(initialUser);
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState(allCourses);

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