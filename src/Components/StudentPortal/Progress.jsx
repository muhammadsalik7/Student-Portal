import React, { useState } from 'react';
import './Progress.css';
import PortalLogo from '../PortalLogo.jsx';

const menuItems = [['Dashboard', 'DB'], ['Progress', 'PR'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];
const topicRows = [
  ['Web Designing', 'Topics: 20/20', '100%', 'complete'],
  ['Front-End Development', 'Topics: 27/31', '87%', 'pending'],
  ['Modern Front-End Development', 'Topics: 10/14', '71%', 'pending'],
  ['Back-End Development', 'Topics: 0/16', '0%', 'pending']
];

export default function Progress({ activeTab = 'Progress', onNavigate, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = (tab) => {
    setShowProfileMenu(false);
    if (typeof onNavigate === 'function') onNavigate(tab);
  };

  return (
    <div className={`progress-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="progress-sidebar">
        <div>
          <button type="button" className="progress-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="progress-logo" />
          <nav className="progress-nav">
            {menuItems.map(([label, icon]) => (
              <button type="button" key={label} className={`progress-nav-item ${activeTab === label ? 'active' : ''}`} onClick={() => navigate(label)}>
                <b>{icon}</b>{label}
              </button>
            ))}
          </nav>
        </div>
        <div className="progress-user-area">
          <button type="button" className="progress-user-trigger" onClick={() => setShowProfileMenu((visible) => !visible)}>
            <span className="progress-avatar">MR</span><span><strong>Muhammad Rehan</strong><small>Student</small></span><em>^</em>
          </button>
          {showProfileMenu && <div className="progress-user-menu">
            <button type="button" onClick={() => { setShowProfile(true); setShowProfileMenu(false); }}><b>PR</b> Profile</button>
            <button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button>
            <button type="button" className="logout-action" onClick={onLogout}><b>LO</b> Logout</button>
          </div>}
        </div>
      </aside>

      <main className="progress-main">
        <header className="progress-topbar">
          <div className="progress-breadcrumb"><span>Home</span><b>›</b><span>Modern Web Application Development</span><b>›</b><strong>Progress</strong></div>
          <button type="button" onClick={() => alert('Thank you for your feedback!')}>Feedback</button>
        </header>

        <section className="progress-stats">
          <div><strong>81</strong><span>Total Topics</span><i className="stat-book">TB</i></div>
          <div><strong>57</strong><span>Completed Topics</span><i className="stat-cap">CT</i></div>
          <div><strong>24</strong><span>Pending Topics</span><i className="stat-clock">PT</i></div>
        </section>

        <section className="topic-list" aria-label="Course progress topics">
          {topicRows.map(([title, subtitle, percent, status]) => (
            <button type="button" className="topic-row" key={title} onClick={() => alert(`${title}: ${percent} complete`)}>
              <span className={`topic-status ${status}`}>{status === 'complete' ? 'OK' : 'CL'}</span>
              <span className="topic-copy"><strong>{title}</strong><small>{subtitle}</small></span>
              <span className="topic-progress"><span className="ring" style={{ '--progress': percent }}>{percent}</span></span>
            </button>
          ))}
        </section>
      </main>

      {showProfile && <div className="progress-modal" onClick={() => setShowProfile(false)}><section onClick={(event) => event.stopPropagation()}><div className="progress-avatar large">MR</div><small>Student profile</small><h2>Muhammad Rehan</h2><p>Student ID: 493853</p><p>Modern Web Application Development</p><button type="button" onClick={() => setShowProfile(false)}>Close</button></section></div>}
    </div>
  );
}
