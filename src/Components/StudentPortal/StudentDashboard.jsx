import React, { useState } from 'react';
import './StudentDashboard.css';
import PortalLogo from '../PortalLogo.jsx';

export default function StudentDashboard({ initialTab = 'Dashboard', onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chartRange, setChartRange] = useState('weekly');
  const [selectedChartPoint, setSelectedChartPoint] = useState(3);
  const [selectedScheduleDay, setSelectedScheduleDay] = useState(1);
  const [scheduleTab, setScheduleTab] = useState('Assignments');

  const menuItems = [['Dashboard', 'DB'], ['Progress', 'PR'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];
  const performance = [68, 82, 72, 92, 78, 88, 64];
  const monthlyPerformance = [54, 61, 70, 66, 75, 81, 74, 86, 79, 91, 84, 88];
  const chartData = chartRange === 'weekly' ? performance : monthlyPerformance;
  const chartLabels = chartRange === 'weekly' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const openTab = (tab) => {
    setShowProfileMenu(false);
    if (tab === 'Progress' && typeof onNavigate === 'function') {
      onNavigate('Progress');
      return;
    }
    if (tab === 'Attendance' && typeof onNavigate === 'function') {
      onNavigate('Attendance');
      return;
    }
    if (tab === 'Assignment' && typeof onNavigate === 'function') {
      onNavigate('Assignment');
      return;
    }
    if (tab === 'Quiz' && typeof onNavigate === 'function') {
      onNavigate('Quiz');
      return;
    }
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    if (activeTab === 'Dashboard') return null;
    const details = {
      Progress: ['Course Progress', 'Modern Web Application Development', '74% completed'],
      Attendance: ['Attendance', '84 / 138 classes attended', 'Current attendance: 61%'],
      Assignment: ['Assignments', '6 of 13 assignments completed', 'Next submission: Friday'],
      Quiz: ['Quizzes', 'No upcoming quizzes', 'Keep checking your course schedule']
    };
    const [title, value, note] = details[activeTab];
    return <section className="content-panel detail-panel"><div className="panel-heading"><div><p className="eyebrow">Student portal</p><h2>{title}</h2></div><span className="panel-badge">Updated today</span></div><div className="detail-highlight">{value}</div><p className="detail-note">{note}</p><button type="button" className="secondary-action" onClick={() => openTab('Dashboard')}>Back to dashboard</button></section>;
  };

  return (
    <div className={`smit-dashboard-wrapper ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="smit-sidebar">
        <div>
          <button type="button" className="sidebar-collapse-btn" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {sidebarCollapsed ? '>' : '<'}
          </button>
          <PortalLogo className="sidebar-logo" />

          <nav className="sidebar-nav">
            {menuItems.map(([item, icon]) => (
              <button
                key={item}
                type="button"
                className={`nav-item ${activeTab === item ? 'active' : ''}`}
                onClick={() => openTab(item)}
              >
                <span className="nav-icon">{icon}</span>
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-user-section">
          <div
            className="user-profile-trigger"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          >
            <div className="user-avatar">MR</div>
            <div className="user-info-text">
              <span className="user-name">Muhammad Rehan</span>
              <span className="user-role">Student</span>
            </div>
            <span className="profile-chevron">^</span>
          </div>

          {showProfileMenu && (
            <div className="user-dropdown-menu">
              <button type="button" onClick={() => { setShowProfile(true); setShowProfileMenu(false); }}>
                <span className="menu-icon">PR</span> Profile
              </button>
              <button type="button" onClick={() => setDarkMode((prev) => !prev)}>
                <span className="menu-icon">{darkMode ? 'LM' : 'DM'}</span> {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button type="button" className="dropdown-logout" onClick={onLogout}>
                <span className="menu-icon">LO</span> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="dashboard-main-content">
        <div className="dashboard-topbar">
          <div className="breadcrumb"><span>Home</span><b>/</b><strong>{activeTab === 'Dashboard' ? 'Modern Web Application Development' : activeTab}</strong></div>
          <button type="button" className="feedback-btn" onClick={() => alert('Thank you for your feedback!')}>Feedback</button>
        </div>

        {activeTab === 'Dashboard' ? <div className="dashboard-grid"><div className="dashboard-primary"><div className="stats-row"><button type="button" className="stat-card" onClick={() => openTab('Attendance')}><span className="stat-icon teal">AT</span><span><strong>84/138</strong><small>Attendance</small></span></button><button type="button" className="stat-card" onClick={() => openTab('Assignment')}><span className="stat-icon violet">AS</span><span><strong>6/13</strong><small>Assignment</small></span></button></div>

        <section className="content-panel analytics-card"><div className="panel-heading"><div><p className="eyebrow">Course analytics</p><h2>Learning Activity</h2></div><div className="chart-controls"><button type="button" className={chartRange === 'weekly' ? 'active' : ''} onClick={() => { setChartRange('weekly'); setSelectedChartPoint(3); }}>Weekly</button><button type="button" className={chartRange === 'monthly' ? 'active' : ''} onClick={() => { setChartRange('monthly'); setSelectedChartPoint(8); }}>Monthly</button></div></div><div className="analytics-summary"><strong>{chartData[selectedChartPoint]}%</strong><span>{chartRange === 'weekly' ? 'Thursday activity' : 'September activity'}</span><span className="graph-legend"><i></i> Completion score</span></div><div className="analytics-chart">{chartData.map((value, index) => <button type="button" className={`analytics-column ${selectedChartPoint === index ? 'selected' : ''}`} key={`${chartLabels[index]}-${value}`} onClick={() => setSelectedChartPoint(index)}><span>{value}%</span><div className="analytics-bar" style={{ height: `${value}%` }}></div><small>{chartLabels[index]}</small></button>)}</div></section></div><aside className="content-panel schedule-panel"><div className="panel-heading"><div><p className="eyebrow">Weekly timetable</p><h2>Class Schedule</h2></div><span className="calendar-icon">CAL</span></div><div className="schedule-days">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => <button type="button" className={`${selectedScheduleDay === index ? 'selected-day ' : ''}${index === 1 || index === 3 || index === 5 ? 'class-day' : ''}`} key={day} onClick={() => setSelectedScheduleDay(index)}><span>{day}</span><em>{20 + index}</em></button>)}</div><div className="schedule-tabs">{['Assignments', 'Quizzes', 'Events'].map((tab) => <button type="button" className={scheduleTab === tab ? 'selected' : ''} key={tab} onClick={() => setScheduleTab(tab)}>{tab}</button>)}</div><p className="empty-schedule">{scheduleTab === 'Assignments' && 'No upcoming assignments'}{scheduleTab === 'Quizzes' && 'No upcoming quizzes'}{scheduleTab === 'Events' && `No events on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedScheduleDay]}`}</p></aside></div> : renderTabContent()}
      </main>
      {showProfile && <div className="profile-modal-overlay" onClick={() => setShowProfile(false)}><section className="profile-modal-box" onClick={(event) => event.stopPropagation()}><div className="modal-avatar">MR</div><p className="eyebrow">Student profile</p><h2>Muhammad Rehan</h2><p>Student ID: 493853</p><p>Modern Web Application Development</p><button type="button" className="close-modal-btn" onClick={() => setShowProfile(false)}>Close</button></section></div>}
    </div>
  );
}