import React, { useState } from 'react';
import './AdminDashboard.css';
import PortalLogo from '../PortalLogo.jsx';

const menuItems = [['Dashboard', 'DB'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU'], ['Users', 'US']];

export default function AdminDashboard({ onNavigate, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`admin-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div>
          <button type="button" className="admin-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="admin-logo" />
          <nav className="admin-nav">
            {menuItems.map(([label, icon]) => (
              <button type="button" key={label} className={`admin-nav-item ${label === 'Dashboard' ? 'active' : ''}`} onClick={() => onNavigate?.(label)}>
                <b>{icon}</b>{label}
              </button>
            ))}
          </nav>
        </div>

        <div className="admin-user-area">
          <button type="button" className="admin-user-trigger" onClick={() => setShowProfileMenu((visible) => !visible)}>
            <span className="admin-avatar">AD</span>
            <span><strong>Admin Rehan</strong><small>Super Admin</small></span>
            <em>^</em>
          </button>
          {showProfileMenu && (
            <div className="admin-user-menu">
              <button type="button"><b>PR</b> Profile</button>
              <button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button>
              <button type="button" className="logout-action" onClick={onLogout}><b>LO</b> Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb"><span>Home</span><b>›</b><strong>Admin Dashboard</strong></div>
          <button type="button" className="admin-feedback" onClick={() => alert('Thank you for your feedback!')}>Feedback</button>
        </header>

        <section className="admin-cards">
          <div className="admin-card"><strong>320</strong><span>Students</span><i>ST</i></div>
          <div className="admin-card"><strong>48</strong><span>Teachers</span><i>TR</i></div>
          <div className="admin-card"><strong>94%</strong><span>Completion</span><i>CP</i></div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header"><h3>System Overview</h3></div>
          <div className="admin-list">
            <div><span>Students enrolled</span><strong>320</strong></div>
            <div><span>Active batches</span><strong>8</strong></div>
            <div><span>Pending approvals</span><strong>14</strong></div>
          </div>
        </section>
      </main>
    </div>
  );
}
