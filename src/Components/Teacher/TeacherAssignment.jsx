import React from 'react';
import StaffAcademicPage from '../StaffAcademicPage.jsx';
import './TeacherAssignment.css';

export default function TeacherAssignment({ onNavigate, onLogout }) {
  return <StaffAcademicPage role="teacher" page="Assignment" themeClass="teacher-assignment-theme" onNavigate={onNavigate} onLogout={onLogout} />;
}
