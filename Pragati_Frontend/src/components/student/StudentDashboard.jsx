import React, { useState, useEffect } from 'react';
import { Home, BookOpen, BarChart2, User, Bell, Search, ChevronDown, Menu, X, Calendar, CheckCircle, Clock, Edit3, Settings, LogOut, Mail, Award } from 'lucide-react';

// --- MOCK DATA ---
const initialUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://placehold.co/100x100/6366F1/FFFFFF?text=AJ',
  bio: 'Lifelong learner and aspiring full-stack developer. Passionate about creating intuitive and beautiful user interfaces.',
  joined: 'July 2024',
};

const stats = [
  { id: 1, label: 'Courses in Progress', value: 4, icon: <Clock className="w-6 h-6 text-indigo-500" /> },
  { id: 2, label: 'Completed Courses', value: 8, icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
  { id: 3, label: 'Upcoming Assignments', value: 3, icon: <Calendar className="w-6 h-6 text-yellow-500" /> },
];

const allCourses = [
  { id: 1, title: 'Introduction to React', instructor: 'Dr. Angela Yu', progress: 75, category: 'Web Development', image: 'https://placehold.co/600x400/818CF8/FFFFFF?text=React' },
  { id: 2, title: 'Advanced JavaScript', instructor: 'Jonas Schmedtmann', progress: 45, category: 'Web Development', image: 'https://placehold.co/600x400/FBBF24/FFFFFF?text=JS' },
  { id: 3, title: 'UI/UX Design Fundamentals', instructor: 'Gary Simon', progress: 90, category: 'Design', image: 'https://placehold.co/600x400/F472B6/FFFFFF?text=UI/UX' },
  { id: 4, title: 'Data Structures & Algorithms', instructor: 'Andrei Neagoie', progress: 60, category: 'Computer Science', image: 'https://placehold.co/600x400/34D399/FFFFFF?text=DSA' },
  { id: 5, title: 'Python for Data Science', instructor: 'Jose Portilla', progress: 100, category: 'Data Science', image: 'https://placehold.co/600x400/60A5FA/FFFFFF?text=Python' },
  { id: 6, title: 'Node.js - The Complete Guide', instructor: 'Maximilian Schwarzmüller', progress: 25, category: 'Web Development', image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=Node' },
];

const deadlines = [
    { id: 1, title: 'React Hooks Project', course: 'Introduction to React', dueDate: 'Aug 25, 2025', dueTime: '11:59 PM' },
    { id: 2, title: 'Async/Await Quiz', course: 'Advanced JavaScript', dueDate: 'Aug 28, 2025', dueTime: '10:00 AM' },
    { id: 3, title: 'Final Design Prototype', course: 'UI/UX Design Fundamentals', dueDate: 'Sep 02, 2025', dueTime: '5:00 PM' },
];

const grades = [
    { id: 1, course: 'Introduction to React', grade: 'A-', score: 92, instructor: 'Dr. Angela Yu' },
    { id: 2, course: 'UI/UX Design Fundamentals', grade: 'A', score: 95, instructor: 'Gary Simon' },
    { id: 3, course: 'Python for Data Science', grade: 'B+', score: 88, instructor: 'Jose Portilla' },
    { id: 4, course: 'History of Ancient Art', grade: 'A-', score: 91, instructor: 'Dr. Eleanor Vance' },
];

const notifications = [
    { id: 1, icon: <Award className="w-5 h-5 text-yellow-500"/>, text: 'You earned a new certificate!', time: '5m ago' },
    { id: 2, icon: <Calendar className="w-5 h-5 text-red-500"/>, text: 'Project deadline is tomorrow.', time: '1h ago' },
    { id: 3, icon: <Mail className="w-5 h-5 text-blue-500"/>, text: 'New message from Dr. Angela Yu.', time: '1d ago' },
];


// --- REUSABLE COMPONENTS ---

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} /> },
    { name: 'My Courses', icon: <BookOpen size={20} /> },
    { name: 'Grades', icon: <BarChart2 size={20} /> },
    { name: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 lg:flex-shrink-0`}>
        <div className="flex items-center justify-between h-16 p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">Pragati Dashboard</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 lg:hidden"><X size={24} /></button>
        </div>
        <nav className="p-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(item.name); setIsOpen(false); }} className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 no-underline ${activeTab === item.name ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {item.icon}
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <a href="#" className="flex items-center p-3 my-1 text-gray-600 no-underline rounded-lg hover:bg-gray-100">
            <LogOut size={20} />
            <span className="ml-3 text-sm font-medium">Logout</span>
          </a>
        </div>
      </aside>
    </>
  );
};

const Header = ({ user, setIsSidebarOpen, searchTerm, setSearchTerm }) => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <header className="z-10 flex items-center justify-between w-full h-16 p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(true)} className="mr-4 text-gray-600 lg:hidden"><Menu size={24} /></button>
        <div className="relative hidden md:block">
          <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
          <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64 py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative">
          <button onClick={() => setNotificationsOpen(!isNotificationsOpen)} className="relative text-gray-500 hover:text-gray-700">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 overflow-hidden bg-white border rounded-lg shadow-xl w-80">
              <div className="p-3 font-semibold text-gray-800 border-b">Notifications</div>
              <div className="divide-y">
                {notifications.map(n => (
                  <div key={n.id} className="flex items-center p-3 space-x-3 hover:bg-gray-50">
                    {n.icon}
                    <p className="flex-1 text-sm text-gray-600">{n.text}</p>
                    <p className="text-xs text-gray-400">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center">
            <img src={user.avatar} alt={user.name} className="object-cover rounded-full w-9 h-9" />
            <div className="hidden ml-3 text-left sm:block">
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
            <ChevronDown size={18} className="ml-2 text-gray-500" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 w-48 py-1 mt-3 bg-white border rounded-lg shadow-xl">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User size={16} className="mr-2"/> Profile</a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Settings size={16} className="mr-2"/> Settings</a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><LogOut size={16} className="mr-2"/> Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const CourseCard = ({ course }) => (
    <div className="flex flex-col overflow-hidden transition-transform duration-300 transform bg-white shadow-md rounded-xl hover:-translate-y-1">
      <img src={course.image} alt={course.title} className="object-cover w-full h-40" />
      <div className="flex flex-col flex-grow p-5">
        <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">{course.category}</p>
        <h3 className="flex-grow mt-2 text-base font-semibold text-gray-800">{course.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-500">Progress</span>
              <span className="text-xs font-semibold text-indigo-600">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-indigo-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
         <button className="w-full py-2 mt-5 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
            {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
        </button>
      </div>
    </div>
);

const EditProfileModal = ({ user, setUser, setIsOpen }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(formData);
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full p-2 border rounded-lg"></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ContinueLearningItem = ({ course }) => (
    <a href="#" className="flex items-center p-4 space-x-4 no-underline transition-all duration-300 transform bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1">
      <img src={course.image} alt={course.title} className="flex-shrink-0 object-cover w-20 h-20 rounded-lg" />
      <div className="flex-grow">
        <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">{course.category}</p>
        <h4 className="mt-1 text-base font-semibold text-gray-800">{course.title}</h4>
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-500">Progress</span>
              <span className="text-xs font-semibold text-indigo-600">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-indigo-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      </div>
    </a>
);


// --- PAGE COMPONENTS ---

const DashboardHome = ({ user }) => (
    <>
        <div className="p-8 mb-8 text-white bg-indigo-600 shadow-lg rounded-xl">
            <h2 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
            <p className="max-w-2xl mt-2 text-indigo-200">Ready to continue your learning journey? Let's make today productive.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map(stat => (
                <div key={stat.id} className="flex items-center p-6 space-x-4 bg-white shadow-md rounded-xl">
                    <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Continue Learning</h3>
                <div className="space-y-4">
                    {allCourses.filter(c => c.progress < 100).slice(0, 2).map(course => <ContinueLearningItem key={course.id} course={course} />)}
                </div>
            </div>
            <div className="bg-white shadow-md rounded-xl">
                <h3 className="p-5 text-xl font-semibold text-gray-800 border-b border-gray-200">Upcoming Deadlines</h3>
                <div className="divide-y divide-gray-200">
                    {deadlines.map(deadline => (
                        <div key={deadline.id} className="flex items-start p-4 space-x-4">
                            <div className="p-3 bg-yellow-100 rounded-full"><Calendar className="w-5 h-5 text-yellow-600" /></div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">{deadline.title}</h4>
                                <p className="text-xs text-gray-500">{deadline.course}</p>
                                <p className="mt-1 text-sm font-medium text-red-600">{deadline.dueDate} at {deadline.dueTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4"><button className="w-full text-sm font-semibold text-center text-indigo-600 hover:underline">View All</button></div>
            </div>
        </div>
    </>
);

const MyCourses = ({ courses }) => {
    const [filter, setFilter] = useState('All');

    const filteredCourses = courses.filter(course => {
        if (filter === 'In Progress') return course.progress > 0 && course.progress < 100;
        if (filter === 'Completed') return course.progress === 100;
        return true;
    });

    return (
        <div>
            <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                <div className="flex p-1 space-x-1 bg-gray-200 rounded-lg">
                    {['All', 'In Progress', 'Completed'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${filter === f ? 'bg-white text-indigo-600 shadow' : 'text-gray-600 hover:bg-white/50'}`}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.length > 0 ? filteredCourses.map(course => <CourseCard key={course.id} course={course} />) : <p className="py-10 text-center text-gray-500 md:col-span-2 lg:col-span-3">No courses match your search.</p>}
            </div>
        </div>
    );
};

const Grades = () => (
    <div className="overflow-hidden bg-white shadow-md rounded-xl">
        <h2 className="p-6 text-2xl font-bold text-gray-800">My Grades</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold">Course</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Instructor</th>
                        <th scope="col" className="px-6 py-4 font-semibold text-center">Score</th>
                        <th scope="col" className="px-6 py-4 font-semibold text-center">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map(grade => (
                        <tr key={grade.id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{grade.course}</th>
                            <td className="px-6 py-4">{grade.instructor}</td>
                            <td className="px-6 py-4 text-center">{grade.score}%</td>
                            <td className="px-6 py-4 font-bold text-center text-indigo-600">{grade.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const Profile = ({ user, setUser }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    return (
        <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-800">My Profile</h2>
            <div className="p-8 bg-white shadow-md rounded-xl">
                <div className="flex flex-col items-center md:flex-row">
                    <img src={user.avatar} alt={user.name} className="object-cover mb-4 rounded-full w-28 h-28 md:mb-0 md:mr-8" />
                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="mt-1 text-sm text-gray-500">Joined: {user.joined}</p>
                    </div>
                    <button onClick={() => setEditModalOpen(true)} className="flex items-center px-4 py-2 mt-4 space-x-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg md:mt-0 hover:bg-indigo-200">
                        <Edit3 size={16} />
                        <span>Edit Profile</span>
                    </button>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-200">
                    <h4 className="mb-2 font-semibold text-gray-800">About Me</h4>
                    <p className="leading-relaxed text-gray-600">{user.bio}</p>
                </div>
            </div>
            {isEditModalOpen && <EditProfileModal user={user} setUser={setUser} setIsOpen={setEditModalOpen} />}
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [user, setUser] = useState(initialUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(allCourses);

  useEffect(() => {
      if (activeTab === 'My Courses') {
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
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} setIsSidebarOpen={setIsSidebarOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto lg:p-8">
          <div className="mx-auto max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
