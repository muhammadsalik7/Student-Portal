import React from 'react';
import StaffAcademicPage from '../StaffAcademicPage.jsx';
import './AdminQuiz.css';

export default function AdminQuiz({ onNavigate, onLogout }) {
  return <StaffAcademicPage role="admin" page="Quiz" themeClass="admin-quiz-theme" onNavigate={onNavigate} onLogout={onLogout} />;
}
