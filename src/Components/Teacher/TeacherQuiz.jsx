import React from 'react';
import StaffAcademicPage from '../StaffAcademicPage.jsx';
import './TeacherQuiz.css';

export default function TeacherQuiz({ onNavigate, onLogout }) {
  return <StaffAcademicPage role="teacher" page="Quiz" themeClass="teacher-quiz-theme" onNavigate={onNavigate} onLogout={onLogout} />;
}
