import React from 'react';
import StaffAcademicPage from '../StaffAcademicPage.jsx';
import './TeacherAttendance.css';

export default function TeacherAttendance({ onNavigate, onLogout }) {
  return <StaffAcademicPage role="teacher" page="Attendance" themeClass="teacher-attendance-theme" onNavigate={onNavigate} onLogout={onLogout} />;
}
