import React, { useMemo, useState } from 'react';
import './StaffPermissionsPage.css';
import PortalLogo from './PortalLogo.jsx';

const recordsByPage = {
  Attendance: [
    { name: 'Muhammad Rehan', id: '493853', batch: 'MWA Batch-20', status: 'Active', time: '09:02 AM' },
    { name: 'Ayesha Khan', id: '493854', batch: 'MWA Batch-20', status: 'Active', time: '09:05 AM' },
    { name: 'Hamza Ali', id: '493855', batch: 'MWA Batch-20', status: 'Inactive', time: '-' },
    { name: 'Sara Ahmed', id: '493856', batch: 'MWA Batch-20', status: 'Active', time: '09:11 AM' }
  ],
  Assignment: [
    { title: 'Admin Panel Dashboard', module: 'Modern Web App', due: 'September 28, 2026', status: 'Approved' },
    { title: 'React E-Commerce Website', module: 'React JS', due: 'October 04, 2026', status: 'Submitted' },
    { title: 'JavaScript Workshop', module: 'Front-End Development', due: 'October 10, 2026', status: 'Submitted' },
    { title: 'Portfolio Website', module: 'Web Designing', due: 'October 15, 2026', status: 'Approved' }
  ],
  Quiz: [
    { title: 'JavaScript Quiz - 03', detail: '40 Questions', attempts: '148 Attempts', status: 'Published' },
    { title: 'React Fundamentals', detail: '30 Questions', attempts: '132 Attempts', status: 'Published' },
    { title: 'CSS Layout Quiz', detail: '25 Questions', attempts: '0 Attempts', status: 'Draft' },
    { title: 'HTML Semantics Quiz', detail: '30 Questions', attempts: '145 Attempts', status: 'Published' }
  ]
};

const pageInfo = {
  Attendance: { title: 'Attendance Overview', subtitle: 'Monitor active students across the current batch.', action: 'Mark Attendance' },
  Assignment: { title: 'Assignment Management', subtitle: 'Create, review, edit, and approve student submissions.', action: 'Create Assignment' },
  Quiz: { title: 'Quiz Management', subtitle: 'Create, edit, publish, and review student quizzes.', action: 'Create Quiz' }
};

const navItems = [['Dashboard', 'DB'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];

export default function StaffPermissionsPage({ role = 'teacher', page = 'Attendance', onNavigate, onLogout }) {
  const info = pageInfo[page];
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [records, setRecords] = useState(() => recordsByPage[page].map((record) => ({ ...record })));
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: '', detail: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const roleName = role === 'admin' ? 'Admin' : 'Teacher';
  const initials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  const visibleRecords = useMemo(() => {
    if (filter === 'All') return records;
    return records.filter((record) => record.status === filter);
  }, [filter, records]);

  const openCreate = () => {
    setEditingIndex(null);
    setForm({ title: '', detail: '' });
    setModal('form');
  };

  const openEdit = (record) => {
    const index = records.indexOf(record);
    setEditingIndex(index);
    setForm({ title: record.name || record.title, detail: record.module || record.detail || '' });
    setModal('form');
  };

  const saveRecord = () => {
    if (!form.title.trim()) return;
    const nextRecord = page === 'Attendance'
      ? { name: form.title.trim(), id: `493${857 + records.length}`, batch: form.detail.trim() || 'MWA Batch-20', status: 'Active', time: 'Now' }
      : page === 'Assignment'
        ? { title: form.title.trim(), module: form.detail.trim() || 'Modern Web App', due: 'October 20, 2026', status: 'Submitted' }
        : { title: form.title.trim(), detail: form.detail.trim() || '30 Questions', attempts: '0 Attempts', status: 'Draft' };
    setRecords((current) => editingIndex === null ? [nextRecord, ...current] : current.map((record, index) => index === editingIndex ? { ...record, ...(page === 'Attendance' ? { name: nextRecord.name, batch: nextRecord.batch } : page === 'Assignment' ? { title: nextRecord.title, module: nextRecord.module } : { title: nextRecord.title, detail: nextRecord.detail }) } : record));
    setModal(null);
  };

  const updateStatus = (record, status) => {
    setRecords((current) => current.map((item) => item === record ? { ...item, status } : item));
  };

  const removeRecord = (record) => {
    if (window.confirm(`Delete ${record.name || record.title}?`)) setRecords((current) => current.filter((item) => item !== record));
  };

  const stats = page === 'Attendance'
    ? [['148', 'Total Students'], [records.filter((record) => record.status === 'Active').length, 'Active Today'], ['90%', 'Average Attendance']]
    : page === 'Assignment'
      ? [[records.length, 'Total Assignments'], [records.filter((record) => record.status === 'Submitted').length, 'Submitted'], [records.filter((record) => record.status === 'Approved').length, 'Approved']]
      : [[records.filter((record) => record.status === 'Published').length, 'Published Quizzes'], ['148', 'Student Attempts'], ['96%', 'Pass Rate']];

  return (
    <div className={`staff-permissions-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="permissions-sidebar">
        <div>
          <button type="button" className="permissions-collapse" onClick={() => setSidebarCollapsed((value) => !value)} aria-label="Toggle sidebar">{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="permissions-logo" />
          <nav className="permissions-nav">
            {navItems.map(([label, icon]) => <button type="button" key={label} className={`permissions-nav-item ${page === label || (page === 'Dashboard' && label === 'Dashboard') ? 'active' : ''}`} onClick={() => onNavigate?.(label)}><b>{icon}</b>{label}</button>)}
          </nav>
        </div>
        <div className="permissions-user-area">
          <button type="button" className="permissions-user" onClick={() => setShowProfileMenu((value) => !value)}><span className="permissions-avatar">{role === 'admin' ? 'AD' : 'TR'}</span><span><strong>{roleName} Rehan</strong><small>{role === 'admin' ? 'Super Admin' : 'Instructor'}</small></span><em>^</em></button>
          {showProfileMenu && <div className="permissions-menu"><button type="button" onClick={() => setModal('profile')}>PR&nbsp; Profile</button><button type="button" onClick={() => setDarkMode((value) => !value)}>{darkMode ? 'LM' : 'DM'}&nbsp; {darkMode ? 'Light mode' : 'Dark mode'}</button><button type="button" className="logout" onClick={onLogout}>LO&nbsp; Logout</button></div>}
        </div>
      </aside>

      <main className="permissions-main">
        <header className="permissions-topbar"><div className="permissions-breadcrumb"><span>Home</span><b>›</b><strong>{roleName} / {info.title}</strong></div><button type="button" className="permissions-feedback" onClick={() => alert('Thank you for your feedback!')}>Feedback</button></header>
        <section className="permissions-heading"><div><p>{roleName} portal</p><h1>{info.title}</h1><span>{info.subtitle}</span></div><button type="button" className="permissions-primary" onClick={openCreate}>{info.action}</button></section>
        <section className="permissions-stats">{stats.map(([value, label]) => <div className="permissions-stat" key={label}><strong>{value}</strong><span>{label}</span><i>{label.slice(0, 2).toUpperCase()}</i></div>)}</section>

        <section className="permissions-panel"><div className="permissions-panel-head"><div><p>Role permissions</p><h2>{page === 'Attendance' ? 'Student Activity' : page === 'Assignment' ? 'Assignments' : 'Quizzes'}</h2></div><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter records"><option>All</option>{page === 'Attendance' ? <><option>Active</option><option>Inactive</option></> : page === 'Assignment' ? <><option>Submitted</option><option>Approved</option></> : <><option>Published</option><option>Draft</option></>}</select></div>
          {page === 'Attendance' && <div className="permissions-table permissions-attendance"><div className="permissions-table-head"><span>Student</span><span>ID</span><span>Batch</span><span>Status</span><span>Time</span><span>Action</span></div>{visibleRecords.map((record) => <div className="permissions-row" key={record.id}><span className="student-cell"><i>{initials(record.name)}</i>{record.name}</span><span>{record.id}</span><span>{record.batch}</span><span className={`status-pill ${record.status.toLowerCase()}`}>{record.status}</span><span>{record.time}</span><span className="row-actions"><button type="button" onClick={() => updateStatus(record, record.status === 'Active' ? 'Inactive' : 'Active')}>{record.status === 'Active' ? 'Off' : 'On'}</button><button type="button" onClick={() => openEdit(record)}>Edit</button></span></div>)}</div>}
          {page === 'Assignment' && <div className="permissions-table permissions-assignment"><div className="permissions-table-head"><span>Assignment</span><span>Module</span><span>Due Date</span><span>Status</span><span>Action</span></div>{visibleRecords.map((record) => <div className="permissions-row" key={record.title}><strong>{record.title}</strong><span>{record.module}</span><span>{record.due}</span><span className={`status-pill ${record.status.toLowerCase()}`}>{record.status}</span><span className="row-actions"><button type="button" onClick={() => setModal(record)}>View</button><button type="button" onClick={() => updateStatus(record, 'Approved')} disabled={record.status === 'Approved'}>Approve</button><button type="button" onClick={() => openEdit(record)}>Edit</button><button type="button" onClick={() => removeRecord(record)}>Delete</button></span></div>)}</div>}
          {page === 'Quiz' && <div className="permissions-table permissions-quiz"><div className="permissions-table-head"><span>Quiz</span><span>Questions</span><span>Attempts</span><span>Status</span><span>Action</span></div>{visibleRecords.map((record) => <div className="permissions-row" key={record.title}><strong>{record.title}</strong><span>{record.detail}</span><span>{record.attempts}</span><span className={`status-pill ${record.status.toLowerCase()}`}>{record.status}</span><span className="row-actions"><button type="button" onClick={() => setModal(record)}>View</button><button type="button" onClick={() => updateStatus(record, record.status === 'Published' ? 'Draft' : 'Published')}>{record.status === 'Published' ? 'Unpublish' : 'Publish'}</button><button type="button" onClick={() => openEdit(record)}>Edit</button><button type="button" onClick={() => removeRecord(record)}>Delete</button></span></div>)}</div>}
        </section>
      </main>

      {modal === 'form' && <div className="permissions-modal" onClick={() => setModal(null)}><section onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setModal(null)}>×</button><p>{roleName} authority</p><h2>{editingIndex === null ? info.action : 'Edit record'}</h2><label>Title or student name<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Enter a title" /></label><label>{page === 'Attendance' ? 'Batch' : page === 'Assignment' ? 'Module' : 'Questions'}<input value={form.detail} onChange={(event) => setForm({ ...form, detail: event.target.value })} placeholder="Add details" /></label><button type="button" className="permissions-primary" onClick={saveRecord}>Save changes</button></section></div>}
      {modal && modal !== 'form' && modal !== 'profile' && <div className="permissions-modal" onClick={() => setModal(null)}><section onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setModal(null)}>×</button><p>Record details</p><h2>{modal.title}</h2><p>{page === 'Assignment' ? `Module: ${modal.module}` : `Questions: ${modal.detail}`}</p><p>Status: {modal.status}</p><button type="button" className="permissions-primary" onClick={() => setModal(null)}>Close</button></section></div>}
      {modal === 'profile' && <div className="permissions-modal" onClick={() => setModal(null)}><section onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setModal(null)}>×</button><div className="permissions-avatar large">{role === 'admin' ? 'AD' : 'TR'}</div><p>{roleName} profile</p><h2>{roleName} Rehan</h2><p>{role === 'admin' ? 'Full portal administration access' : 'Course instructor access'}</p><button type="button" className="permissions-primary" onClick={() => setModal(null)}>Close</button></section></div>}
    </div>
  );
}
