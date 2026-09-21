import React from 'react';
import StaffAcademicPage from '../StaffAcademicPage.jsx';
import './AdminAssignment.css';

export default function AdminAssignment({ onNavigate, onLogout }) {
  return <StaffAcademicPage role="admin" page="Assignment" themeClass="admin-assignment-theme" onNavigate={onNavigate} onLogout={onLogout} />;
}
