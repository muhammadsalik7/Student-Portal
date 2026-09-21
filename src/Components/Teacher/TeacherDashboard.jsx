import React, { useState } from 'react';
import './TeacherDashboard.css';
import PortalLogo from '../PortalLogo.jsx';

const menuItems = [['Dashboard', 'DB'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU'], ['Students', 'ST']];

export default function TeacherDashboard({ onNavigate, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`teacher-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="teacher-sidebar">
        <div>
          <button type="button" className="teacher-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="teacher-logo" />
          <nav className="teacher-nav">
            {menuItems.map(([label, icon]) => (
              <button type="button" key={label} className={`teacher-nav-item ${label === 'Dashboard' ? 'active' : ''}`} onClick={() => onNavigate?.(label)}>
                <b>{icon}</b>{label}
              </button>
            ))}
          </nav>
        </div>

        <div className="teacher-user-area">
          <button type="button" className="teacher-user-trigger" onClick={() => setShowProfileMenu((visible) => !visible)}>
            <span className="teacher-avatar">TR</span>
            <span><strong>Teacher Rehan</strong><small>Instructor</small></span>
            <em>^</em>
          </button>
          {showProfileMenu && (
            <div className="teacher-user-menu">
              <button type="button"><b>PR</b> Profile</button>
              <button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button>
              <button type="button" className="logout-action" onClick={onLogout}><b>LO</b> Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className="teacher-main">
        <header className="teacher-topbar">
          <div className="teacher-breadcrumb"><span>Home</span><b>›</b><strong>Teacher Dashboard</strong></div>
          <button type="button" className="teacher-feedback" onClick={() => alert('Thank you for your feedback!')}>Feedback</button>
        </header>

        <section className="teacher-cards">
          <div className="teacher-card"><strong>148</strong><span>Total Students</span><i>ST</i></div>
          <div className="teacher-card"><strong>96%</strong><span>Average Pass</span><i>PS</i></div>
          <div className="teacher-card"><strong>12</strong><span>Quizzes</span><i>QZ</i></div>
        </section>

        <section className="teacher-panel">
          <div className="teacher-panel-header"><h3>Today's Schedule</h3></div>
          <div className="teacher-list">
            <div><span>09:00 - 10:30</span><strong>Modern Web App</strong></div>
            <div><span>11:00 - 12:15</span><strong>JavaScript Workshop</strong></div>
            <div><span>02:00 - 03:00</span><strong>Quiz Review</strong></div>
          </div>
        </section>
      </main>
    </div>
  );
}
