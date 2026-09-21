import React, { useEffect, useState } from 'react';
import LoginPortal from './Components/LoginPortal.jsx';
import StudentDashboard from './Components/StudentPortal/StudentDashboard.jsx';
import Progress from './Components/StudentPortal/Progress.jsx';
import Attendence from './Components/StudentPortal/Attendence.jsx';
import Assignment from './Components/StudentPortal/Assignment.jsx';
import Quiz from './Components/StudentPortal/Quiz.jsx';
import TeacherDashboard from './Components/Teacher/TeacherDashboard.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import TeacherAttendance from './Components/Teacher/TeacherAttendance.jsx';
import TeacherAssignment from './Components/Teacher/TeacherAssignment.jsx';
import TeacherQuiz from './Components/Teacher/TeacherQuiz.jsx';
import AdminAttendance from './Components/Admin/AdminAttendance.jsx';
import AdminAssignment from './Components/Admin/AdminAssignment.jsx';
import AdminQuiz from './Components/Admin/AdminQuiz.jsx';
import AdminUsers from './Components/Admin/AdminUsers.jsx';

export default function App() {
  const [session, setSession] = useState(() => {
    try {
      const savedSession = window.localStorage.getItem('student-portal-session');
      const parsedSession = savedSession ? JSON.parse(savedSession) : null;
      if (parsedSession?.isLoggedIn && ['student', 'teacher', 'admin'].includes(parsedSession.userRole)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem('student-portal-session');
    }

    return { isLoggedIn: false, userRole: null, userId: null };
  });
  const [currentPage, setCurrentPage] = useState('Dashboard');

  useEffect(() => {
    if (session.isLoggedIn) {
      window.localStorage.setItem('student-portal-session', JSON.stringify(session));
    } else {
      window.localStorage.removeItem('student-portal-session');
    }
  }, [session]);

  const handleLoginSuccess = (role, userId) => {
    const normalizedRole = ['student', 'teacher', 'admin'].includes(role) ? role : 'student';
    const nextSession = { isLoggedIn: true, userRole: normalizedRole, userId };
    setSession(nextSession);
    setCurrentPage('Dashboard');
  };

  const handleLogout = () => {
    const loggedOutSession = { isLoggedIn: false, userRole: null, userId: null };
    setSession(loggedOutSession);
    setCurrentPage('Dashboard');
  };

  if (session.isLoggedIn && session.userRole === 'student') {
    if (currentPage === 'Progress') {
      return <Progress onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Attendance') {
      return <Attendence onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Assignment') {
      return <Assignment onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Quiz') {
      return <Quiz onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    return <StudentDashboard initialTab={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  if (session.isLoggedIn && session.userRole === 'teacher') {
    if (currentPage === 'Attendance') {
      return <TeacherAttendance onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Assignment') {
      return <TeacherAssignment onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Quiz') {
      return <TeacherQuiz onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    return <TeacherDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  if (session.isLoggedIn && session.userRole === 'admin') {
    if (currentPage === 'Users') {
      return <AdminUsers onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Attendance') {
      return <AdminAttendance onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Assignment') {
      return <AdminAssignment onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    if (currentPage === 'Quiz') {
      return <AdminQuiz onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
    return <AdminDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  return <LoginPortal onLoginSuccess={handleLoginSuccess} />;
}