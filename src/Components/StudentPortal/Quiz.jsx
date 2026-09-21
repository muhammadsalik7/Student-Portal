import React, { useMemo, useState } from 'react';
import './Quiz.css';
import PortalLogo from '../PortalLogo.jsx';

const menuItems = [['Dashboard', 'DB'], ['Progress', 'PR'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];
const quizRows = [
  ['JavaScript (Quiz-3)', 'Modern Front-End Development', '40', '1/3', '65%', 'Pass'],
  ['JavaScript (Quiz-1)', 'Modern Front-End Development', '40', '1/3', '70%', 'Pass'],
  ['CSS Quiz', 'Front-End Development', '40', '1/3', '28%', 'Fail'],
  ['HTML Quiz', 'Web Designing', '40', '2/3', '50%', 'Pass'],
  ['React Quiz', 'Modern Front-End Development', '40', '1/3', '92%', 'Pass']
];

export default function Quiz({ onNavigate, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const visibleRows = useMemo(() => statusFilter === 'All' ? quizRows : quizRows.filter(([, , , , , status]) => status === statusFilter), [statusFilter]);

  const navigate = (tab) => {
    setShowProfileMenu(false);
    if (typeof onNavigate === 'function') onNavigate(tab);
  };

  const averageScore = Math.round(quizRows.reduce((sum, [, , , , score]) => sum + Number(score.replace('%', '')), 0) / quizRows.length);

  return (
    <div className={`quiz-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="quiz-sidebar">
        <div>
          <button type="button" className="quiz-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="quiz-logo" />
          <nav className="quiz-nav">
            {menuItems.map(([label, icon]) => (
              <button type="button" key={label} className={`quiz-nav-item ${label === 'Quiz' ? 'active' : ''}`} onClick={() => navigate(label)}>
                <b>{icon}</b>{label}
              </button>
            ))}
          </nav>
        </div>

        <div className="quiz-user-area">
          <button type="button" className="quiz-user-trigger" onClick={() => setShowProfileMenu((visible) => !visible)}>
            <span className="quiz-avatar">MR</span>
            <span><strong>Muhammad Rehan</strong><small>Student</small></span>
            <em>^</em>
          </button>
          {showProfileMenu && (
            <div className="quiz-user-menu">
              <button type="button" onClick={() => { setShowProfile(true); setShowProfileMenu(false); }}><b>PR</b> Profile</button>
              <button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button>
              <button type="button" className="logout-action" onClick={onLogout}><b>LO</b> Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className="quiz-main">
        <header className="quiz-topbar">
          <div className="quiz-breadcrumb"><span>Home</span><b>›</b><span>Modern Web Application Development</span><b>›</b><strong>Quiz</strong></div>
          <button type="button" className="quiz-feedback" onClick={() => alert('Thank you for your feedback!')}>Feedback</button>
        </header>

        <section className="quiz-intro">
          <h2>Important Information</h2>
          <ul>
            <li>Once started, quizzes must be completed in one session.</li>
            <li>Switching tabs or leaving the window will be recorded.</li>
            <li>Ensure you have a stable internet connection.</li>
            <li>The quiz will open in fullscreen mode.</li>
          </ul>
        </section>

        <section className="quiz-summary">
          <div className="summary-card green"><strong>5</strong><span>Total Quizzes</span><i>QZ</i></div>
          <div className="summary-card blue"><strong>4</strong><span>Passed</span><i>PS</i></div>
          <div className="summary-card amber"><strong>{averageScore}%</strong><span>Average</span><i>AV</i></div>
        </section>

        <section className="quiz-panel">
          <div className="quiz-panel-header">
            <h3>Quiz Results</h3>
            <div className="quiz-filter-row">
              <button type="button" className={statusFilter === 'All' ? 'active' : ''} onClick={() => setStatusFilter('All')}>All</button>
              <button type="button" className={statusFilter === 'Pass' ? 'active' : ''} onClick={() => setStatusFilter('Pass')}>Pass</button>
              <button type="button" className={statusFilter === 'Fail' ? 'active' : ''} onClick={() => setStatusFilter('Fail')}>Fail</button>
            </div>
          </div>

          <div className="quiz-grid-head">
            <span>Title</span>
            <span>Module</span>
            <span>Questions</span>
            <span>Attempts</span>
            <span>Percentage</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {visibleRows.map(([title, module, questions, attempts, percentage, status]) => (
            <div className="quiz-grid-row" key={title}>
              <span>{title}</span>
              <span>{module}</span>
              <span>{questions}</span>
              <span>{attempts}</span>
              <span>{percentage}</span>
              <span className={`quiz-status ${status === 'Pass' ? 'pass' : 'fail'}`}>{status}</span>
              <button type="button" className="quiz-action" onClick={() => alert(`${title}: ${status} with ${percentage}`)}>View</button>
            </div>
          ))}
        </section>
      </main>

      {showProfile && <div className="quiz-modal" onClick={() => setShowProfile(false)}><section onClick={(event) => event.stopPropagation()}><div className="quiz-avatar large">MR</div><small>Student profile</small><h2>Muhammad Rehan</h2><p>Student ID: 493853</p><p>Modern Web Application Development</p><button type="button" onClick={() => setShowProfile(false)}>Close</button></section></div>}
    </div>
  );
}
