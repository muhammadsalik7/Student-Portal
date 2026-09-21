import React from 'react';
import StaffAcademicPage from '../StaffAcademicPage.jsx';
import './AdminAttendance.css';

export default function AdminAttendance({ onNavigate, onLogout }) {
  return <StaffAcademicPage role="admin" page="Attendance" themeClass="admin-attendance-theme" onNavigate={onNavigate} onLogout={onLogout} />;
}
