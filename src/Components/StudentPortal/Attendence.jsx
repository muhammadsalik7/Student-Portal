import React, { useMemo, useState } from 'react';
import './Attendence.css';
import PortalLogo from '../PortalLogo.jsx';

const menuItems = [['Dashboard', 'DB'], ['Progress', 'PR'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];
const months = {
  'September 2026': {
    overview: 90,
    stats: [138, 124, 0, 14],
    rows: [
      ['1', 'Wed, Sep 2, 2026', 'Present', 'present'],
      ['2', 'Fri, Sep 4, 2026', 'Present', 'present'],
      ['3', 'Mon, Sep 7, 2026', 'Present', 'present'],
      ['4', 'Wed, Sep 9, 2026', 'Present', 'present'],
      ['5', 'Fri, Sep 11, 2026', 'Present', 'present'],
      ['6', 'Mon, Sep 14, 2026', 'Absent', 'absent'],
      ['7', 'Thu, Sep 17, 2026', 'Present', 'present'],
      ['8', 'Mon, Sep 21, 2026', 'Present', 'present'],
      ['9', 'Wed, Sep 23, 2026', 'Absent', 'absent'],
      ['10', 'Fri, Sep 25, 2026', 'Present', 'present']
    ]
  },
  'August 2026': {
    overview: 90,
    stats: [120, 108, 0, 12],
    rows: [
      ['1', 'Mon, Aug 3, 2026', 'Present', 'present'],
      ['2', 'Wed, Aug 5, 2026', 'Present', 'present'],
      ['3', 'Fri, Aug 7, 2026', 'Present', 'present'],
      ['4', 'Mon, Aug 10, 2026', 'Present', 'present'],
      ['5', 'Wed, Aug 12, 2026', 'Present', 'present'],
      ['6', 'Fri, Aug 14, 2026', 'Absent', 'absent'],
      ['7', 'Mon, Aug 17, 2026', 'Present', 'present'],
      ['8', 'Wed, Aug 19, 2026', 'Present', 'present'],
      ['9', 'Fri, Aug 21, 2026', 'Absent', 'absent'],
      ['10', 'Mon, Aug 24, 2026', 'Present', 'present']
    ]
  }
};

export default function Attendence({ onNavigate, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [month, setMonth] = useState('September 2026');

  const currentMonthData = months[month] || months['September 2026'];
  const filteredRows = useMemo(() => statusFilter === 'All' ? currentMonthData.rows : currentMonthData.rows.filter(([, , status]) => status === statusFilter), [currentMonthData, statusFilter]);
  const navigate = (tab) => {
    setShowProfileMenu(false);
    if (typeof onNavigate === 'function') onNavigate(tab);
  };

  return (
    <div className={`attendance-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="attendance-sidebar">
        <div>
          <button type="button" className="attendance-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label="Toggle sidebar">{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="attendance-logo" />
          <nav className="attendance-nav">{menuItems.map(([label, icon]) => <button type="button" key={label} className={`attendance-nav-item ${label === 'Attendance' ? 'active' : ''}`} onClick={() => navigate(label)}><b>{icon}</b>{label}</button>)}</nav>
        </div>
        <div className="attendance-user-area">
          <button type="button" className="attendance-user" onClick={() => setShowProfileMenu((visible) => !visible)}><span className="attendance-avatar">MR</span><span><strong>Muhammad Rehan</strong><small>Student</small></span><em>^</em></button>
          {showProfileMenu && <div className="attendance-menu"><button type="button" onClick={() => { setShowProfile(true); setShowProfileMenu(false); }}><b>PR</b> Profile</button><button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button><button type="button" className="logout" onClick={onLogout}><b>LO</b> Logout</button></div>}
        </div>
      </aside>

      <main className="attendance-main">
        <header className="attendance-topbar"><div className="attendance-breadcrumb"><span>Home</span><b>›</b><span>Modern Web Application Development</span><b>›</b><strong>Attendance</strong></div><button type="button" onClick={() => alert('Thank you for your feedback!')}>Feedback</button></header>

        <section className="attendance-stats"><div><strong>{currentMonthData.stats[0]}</strong><span>Total Classes</span><i className="calendar-stat">CL</i></div><div><strong>{currentMonthData.stats[1]}</strong><span>Present</span><i className="present-stat">OK</i></div><div><strong>{currentMonthData.stats[2]}</strong><span>Leave</span><i className="leave-stat">LV</i></div><div><strong>{currentMonthData.stats[3]}</strong><span>Absent</span><i className="absent-stat">AB</i></div></section>

        <section className="attendance-overview"><div className="overview-heading"><div><p className="attendance-eyebrow">{month}</p><h2>Attendance Overview</h2><p>Your attendance is strong and on track.</p></div><strong>{currentMonthData.overview}%</strong></div><div className="attendance-track"><span style={{ width: `${currentMonthData.overview}%` }}></span></div><div className="overview-footer"><span>Current attendance</span><strong>{currentMonthData.stats[1]} of {currentMonthData.stats[0]} classes</strong></div></section>

        <section className="attendance-records"><div className="records-heading"><div><p className="attendance-eyebrow">Class history</p><h2>Attendance Records</h2></div><div className="record-controls"><select value={month} onChange={(event) => setMonth(event.target.value)} aria-label="Select month"><option>September 2026</option><option>August 2026</option><option>July 2026</option></select><div className="filter-buttons">{['All', 'Present', 'Absent'].map((filter) => <button type="button" className={statusFilter === filter ? 'active' : ''} key={filter} onClick={() => setStatusFilter(filter)}>{filter}</button>)}</div></div></div><div className="record-table"><div className="record-table-head"><span>Class</span><span>Date</span><span>Status</span></div>{filteredRows.map(([number, date, status, statusClass]) => <button type="button" className="record-row" key={`${month}-${number}`} onClick={() => alert(`${date}: ${status}`)}><span>{number}</span><span>{date}</span><span className={statusClass}>{status}</span></button>)}{filteredRows.length === 0 && <p className="no-records">No attendance records found.</p>}</div><p className="record-note">Showing {filteredRows.length} records for {month}</p></section>
      </main>

      {showProfile && <div className="attendance-modal" onClick={() => setShowProfile(false)}><section onClick={(event) => event.stopPropagation()}><div className="attendance-avatar large">MR</div><small>Student profile</small><h2>Muhammad Rehan</h2><p>Student ID: 493853</p><p>Modern Web Application Development</p><button type="button" onClick={() => setShowProfile(false)}>Close</button></section></div>}
    </div>
  );
}
