import React, { useMemo, useState } from 'react';
import './StaffAcademicPage.css';
import PortalLogo from './PortalLogo.jsx';

const pageData = {
  Attendance: {
    title: 'Attendance Overview',
    subtitle: 'Monitor attendance across the active batch.',
    stats: [['148', 'Total Students'], ['134', 'Present Today'], ['90%', 'Average Attendance']],
    rows: [['Muhammad Rehan', '493853', 'MWA Batch-20', 'Active', '09:02 AM'], ['Ayesha Khan', '493854', 'MWA Batch-20', 'Active', '09:05 AM'], ['Hamza Ali', '493855', 'MWA Batch-20', 'Inactive', '-'], ['Sara Ahmed', '493856', 'MWA Batch-20', 'Active', '09:11 AM']],
  },
  Assignment: {
    title: 'Assignment Management',
    subtitle: 'Create, review, and track course assignments.',
    stats: [['16', 'Total Assignments'], ['12', 'Submitted Today'], ['4', 'Pending Review']],
    rows: [['Admin Panel Dashboard', 'Modern Web App', 'September 28, 2026', 'Approved'], ['React E-Commerce Website', 'React JS', 'October 04, 2026', 'Submitted'], ['JavaScript Workshop', 'Front-End Development', 'October 10, 2026', 'Submitted'], ['Portfolio Website', 'Web Designing', 'October 15, 2026', 'Approved']],
  },
  Quiz: {
    title: 'Quiz Management',
    subtitle: 'Manage quizzes, attempts, and student performance.',
    stats: [['12', 'Published Quizzes'], ['148', 'Student Attempts'], ['96%', 'Pass Rate']],
    rows: [['JavaScript Quiz - 03', '40 Questions', '148 Attempts', 'Published'], ['React Fundamentals', '30 Questions', '132 Attempts', 'Published'], ['CSS Layout Quiz', '25 Questions', '0 Attempts', 'Draft'], ['HTML Semantics Quiz', '30 Questions', '145 Attempts', 'Published']],
  },
};

const staffMenus = [['Dashboard', 'DB'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];

export default function StaffAcademicPage({ role = 'teacher', page, onNavigate, onLogout, themeClass = '' }) {
  const data = pageData[page] || pageData.Attendance;
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [savedRows, setSavedRows] = useState(data.rows);
  const [formTitle, setFormTitle] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const isAdmin = role === 'admin';
  const roleLabel = isAdmin ? 'Admin' : 'Teacher';
  const visibleRows = useMemo(() => savedRows, [savedRows]);
  const openCreateForm = () => {
    setFormTitle('');
    setFormNotes('');
    setShowForm(true);
  };
  const saveForm = () => {
    if (!formTitle.trim()) return;
    const nextRow = page === 'Attendance'
      ? [formTitle.trim(), '493857', 'MWA Batch-20', 'Active', 'Now']
      : page === 'Assignment'
        ? [formTitle.trim(), formNotes.trim() || 'Modern Web App', 'October 20, 2026', 'Active']
        : [formTitle.trim(), formNotes.trim() || '30 Questions', '0 Attempts', 'Draft'];
    setSavedRows((rows) => [nextRow, ...rows]);
    setShowForm(false);
  };
  const approveAssignment = (assignmentTitle) => {
    setSavedRows((rows) => rows.map((row) => row[0] === assignmentTitle ? [...row.slice(0, 3), 'Approved'] : row));
  };
  const studentInitials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={`staff-academic-page ${themeClass} ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="staff-academic-sidebar">
        <div>
          <button type="button" className="staff-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label="Toggle sidebar">{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="staff-logo" />
          <nav className="staff-nav">
            {staffMenus.map(([label, icon]) => (
              <button type="button" key={label} className={`staff-nav-item ${page === label || (page === 'Dashboard' && label === 'Dashboard') ? 'active' : ''}`} onClick={() => onNavigate?.(label)}><b>{icon}</b>{label}</button>
            ))}
          </nav>
        </div>
        <div className="staff-user-area">
          <button type="button" className="staff-user-trigger" onClick={() => setShowProfileMenu((visible) => !visible)}>
            <span className="staff-avatar">{isAdmin ? 'AD' : 'TR'}</span>
            <span><strong>{isAdmin ? 'Admin Rehan' : 'Teacher Rehan'}</strong><small>{isAdmin ? 'Super Admin' : 'Instructor'}</small></span><em>^</em>
          </button>
          {showProfileMenu && <div className="staff-user-menu"><button type="button"><b>PR</b> Profile</button><button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button><button type="button" className="logout-action" onClick={onLogout}><b>LO</b> Logout</button></div>}
        </div>
      </aside>

      <main className="staff-academic-main">
        <header className="staff-topbar"><div className="staff-breadcrumb"><span>Home</span><b>›</b><strong>{roleLabel} / {data.title}</strong></div><button type="button" className="staff-feedback" onClick={() => alert('Thank you for your feedback!')}>Feedback</button></header>
        <section className="staff-heading"><div><p>{roleLabel} portal</p><h1>{data.title}</h1><span>{data.subtitle}</span></div><button type="button" className="staff-primary-action" onClick={openCreateForm}>{page === 'Attendance' ? 'Mark Attendance' : page === 'Assignment' ? 'Create Assignment' : 'Create Quiz'}</button></section>
        <section className="staff-stats">{data.stats.map(([value, label]) => <div className="staff-stat" key={label}><strong>{value}</strong><span>{label}</span><i>{label.slice(0, 2).toUpperCase()}</i></div>)}</section>
        <section className="staff-table-panel"><div className="staff-panel-header"><div><p>Current records</p><h2>{page === 'Attendance' ? 'Active Students' : page === 'Assignment' ? 'Course Assignments' : 'Published Quizzes'}</h2></div><select aria-label="Filter records"><option>All records</option><option>Active</option><option>Inactive</option><option>Approved</option></select></div><div className={`staff-table staff-table-${page.toLowerCase()}`}><div className="staff-table-head">{page === 'Attendance' ? <><span>Student</span><span>Student ID</span><span>Batch</span><span>Status</span><span>Time</span></> : page === 'Assignment' ? <><span>Assignment</span><span>Module</span><span>Due Date</span><span>Status</span><span>Action</span></> : <><span>Quiz</span><span>Questions</span><span>Attempts</span><span>Status</span></>}</div>{visibleRows.map((row) => page === 'Attendance' ? <div className="staff-table-row" key={row[0]}><span className="staff-student-cell"><i>{studentInitials(row[0])}</i>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span><span className={`staff-status ${row[3].toLowerCase()}`}>{row[3]}</span><span>{row[4]}</span></div> : page === 'Assignment' ? <div className="staff-table-row" key={row[0]}><span className="staff-assignment-title">{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span><span className={`staff-status ${row[3].toLowerCase()}`}>{row[3]}</span><span className="staff-row-actions"><button type="button" aria-label="View assignment" onClick={() => alert(`${row[0]}\nStatus: ${row[3]}`)}>◌</button><button type="button" aria-label="Approve assignment" disabled={row[3] === 'Approved'} onClick={() => approveAssignment(row[0])}>{row[3] === 'Approved' ? '✓' : 'OK'}</button><button type="button" aria-label="Edit assignment" onClick={() => { setFormTitle(row[0]); setFormNotes(row[1]); setShowForm(true); }}>✎</button></span></div> : <div className="staff-table-row" key={row[0]}>{row.map((cell, index) => <span className={index === row.length - 1 ? `staff-status ${cell.toLowerCase().replace(/\s+/g, '-')}` : ''} key={`${row[0]}-${cell}`}>{cell}</span>)}</div>)}</div></section>
      </main>

      {showForm && <div className="staff-modal" onClick={() => setShowForm(false)}><section onClick={(event) => event.stopPropagation()}><button type="button" className="staff-modal-close" onClick={() => setShowForm(false)}>×</button><p>{roleLabel} portal</p><h2>{page === 'Attendance' ? 'Mark Attendance' : page === 'Assignment' ? 'Create Assignment' : 'Create Quiz'}</h2><label>Title or batch<input value={formTitle} onChange={(event) => setFormTitle(event.target.value)} placeholder={page === 'Attendance' ? 'Select a batch' : 'Enter a title'} /></label><label>Notes<textarea value={formNotes} onChange={(event) => setFormNotes(event.target.value)} placeholder="Add details" /></label><button type="button" className="staff-primary-action" onClick={saveForm}>Save {page}</button></section></div>}
    </div>
  );
}
