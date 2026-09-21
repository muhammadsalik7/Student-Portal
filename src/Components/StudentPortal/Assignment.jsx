import React, { useMemo, useState } from 'react';
import './Assignment.css';
import PortalLogo from '../PortalLogo.jsx';

const menuItems = [['Dashboard', 'DB'], ['Progress', 'PR'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU']];

const assignmentRows = [
  { title: 'Admin panel (E commerce Dashboard)', topics: 7, dueDate: 'September 10, 2026', status: 'Submitted', statusClass: 'submitted', actions: ['view', 'edit', 'delete'] },
  { title: 'QUICKSERVE WMA (Batch-20)', topics: 0, dueDate: 'August 30, 2026', status: 'Submitted', statusClass: 'submitted', actions: ['view', 'edit', 'delete'] },
  { title: 'E-Commerce Website (React js)', topics: 4, dueDate: 'August 17, 2026', status: 'Submitted', statusClass: 'submitted', actions: ['view', 'edit', 'delete'] },
  { title: 'Furniture E-Commerce Website', topics: 5, dueDate: 'August 10, 2026', status: 'Submitted', statusClass: 'submitted', actions: ['view', 'edit', 'delete'] },
  { title: 'MaintainIQ (Batch-20)', topics: 0, dueDate: 'July 12, 2026', status: 'Submitted', statusClass: 'submitted', actions: ['view', 'edit', 'delete'] }
];

export default function Assignment({ onNavigate, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignments, setAssignments] = useState(assignmentRows);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [editTitle, setEditTitle] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const visibleRows = useMemo(() => {
    if (statusFilter === 'All') return assignments;
    return assignments.filter((row) => row.statusClass === statusFilter.toLowerCase().replace(/\s+/g, '-'));
  }, [assignments, statusFilter]);

  const statCards = [
    { value: 16, label: 'Assigned', tone: 'blue' },
    { value: 14, label: 'Submitted', tone: 'green' },
    { value: 2, label: 'Pending review', tone: 'soft' }
  ];

  const navigate = (tab) => {
    setShowProfileMenu(false);
    if (typeof onNavigate === 'function') onNavigate(tab);
  };

  const openAssignment = (row, mode) => {
    setSelectedAssignment(row);
    setModalMode(mode);
    setEditTitle(row.title);
    setEditDueDate(row.dueDate);
    setUploadedFile(null);
  };

  const saveAssignment = () => {
    if (!selectedAssignment || !editTitle.trim() || !editDueDate.trim()) return;
    setAssignments((rows) => rows.map((row) => row.title === selectedAssignment.title ? { ...row, title: editTitle.trim(), dueDate: editDueDate.trim() } : row));
    setSelectedAssignment(null);
  };

  const deleteAssignment = (row) => {
    if (window.confirm(`Delete ${row.title}?`)) {
      setAssignments((rows) => rows.filter((item) => item.title !== row.title));
    }
  };

  const uploadAssignment = () => {
    if (!selectedAssignment || !uploadedFile) return;
    setAssignments((rows) => rows.map((row) => row.title === selectedAssignment.title ? { ...row, status: 'Submitted', statusClass: 'submitted' } : row));
    setSelectedAssignment(null);
  };

  const downloadAssignment = (row) => {
    const content = `${row.title}\nTopics: ${row.topics || 'No'}\nDue date: ${row.dueDate}\nStatus: ${row.status}`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
    link.download = `${row.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className={`assignment-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="assignment-sidebar">
        <div>
          <button type="button" className="assignment-collapse" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{sidebarCollapsed ? '>' : '<'}</button>
          <PortalLogo className="assignment-logo" />

          <nav className="assignment-nav">
            {menuItems.map(([label, icon]) => (
              <button type="button" key={label} className={`assignment-nav-item ${label === 'Assignment' ? 'active' : ''}`} onClick={() => navigate(label)}>
                <b>{icon}</b>
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="assignment-user-area">
          <button type="button" className="assignment-user-trigger" onClick={() => setShowProfileMenu((visible) => !visible)}>
            <span className="assignment-avatar">MR</span>
            <span>
              <strong>Muhammad Rehan</strong>
              <small>Student</small>
            </span>
            <em>^</em>
          </button>

          {showProfileMenu && (
            <div className="assignment-user-menu">
              <button type="button" onClick={() => { setShowProfile(true); setShowProfileMenu(false); }}><b>PR</b> Profile</button>
              <button type="button" onClick={() => setDarkMode((enabled) => !enabled)}><b>{darkMode ? 'LM' : 'DM'}</b> {darkMode ? 'Light mode' : 'Dark mode'}</button>
              <button type="button" className="logout-action" onClick={onLogout}><b>LO</b> Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className="assignment-main">
        <header className="assignment-topbar">
          <div className="assignment-breadcrumb">
            <span>Home</span>
            <b>›</b>
            <span>Modern Web Application Development</span>
            <b>›</b>
            <strong>Assignment</strong>
          </div>
          <button type="button" className="assignment-feedback" onClick={() => alert('Thank you for your feedback!')}>Feedback</button>
        </header>

        <section className="assignment-summary">
          {statCards.map((card) => (
            <div key={card.label} className={`summary-card ${card.tone}`}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
              <i>{card.label === 'Assigned' ? 'AS' : card.label === 'Submitted' ? 'SU' : 'PD'}</i>
            </div>
          ))}
        </section>

        <section className="assignment-panel">
          <div className="assignment-panel-header">
            <h2>Assignment</h2>
            <div className="panel-filter-row">
              <button type="button" className={statusFilter === 'All' ? 'active' : ''} onClick={() => setStatusFilter('All')}>All</button>
              <button type="button" className={statusFilter === 'Submitted' ? 'active' : ''} onClick={() => setStatusFilter('Submitted')}>Submitted</button>
              <button type="button" className={statusFilter === 'Pending' ? 'active' : ''} onClick={() => setStatusFilter('Pending')}>Pending</button>
            </div>
          </div>

          <div className="assignment-table">
            <div className="assignment-table-head">
              <span>Assignment</span>
              <span>Topics</span>
              <span>Due Date</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {visibleRows.map((row) => (
              <div className="assignment-table-row" key={row.title}>
                <span className="assignment-title">{row.title}</span>
                <span className="assignment-topics">{row.topics === 0 ? 'No topics' : `${row.topics} Topics`}</span>
                <span className="assignment-date">{row.dueDate}</span>
                <span className={`assignment-status ${row.statusClass}`}>{row.status}</span>
                <span className="assignment-actions">
                  <button type="button" className="action-btn" aria-label="View assignment" onClick={() => openAssignment(row, 'view')}>◌</button>
                  <button type="button" className="action-btn" aria-label="Upload assignment" onClick={() => openAssignment(row, 'upload')}>↥</button>
                  <button type="button" className="action-btn" aria-label="Edit assignment" onClick={() => openAssignment(row, 'edit')}>✎</button>
                  <button type="button" className="action-btn" aria-label="Download assignment" onClick={() => downloadAssignment(row)}>↓</button>
                  <button type="button" className="action-btn" aria-label="Delete assignment" onClick={() => deleteAssignment(row)}>⌫</button>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showProfile && (
        <div className="assignment-modal" onClick={() => setShowProfile(false)}>
          <section onClick={(event) => event.stopPropagation()}>
            <div className="assignment-avatar large">MR</div>
            <small>Student profile</small>
            <h2>Muhammad Rehan</h2>
            <p>Student ID: 493853</p>
            <p>Modern Web Application Development</p>
            <button type="button" onClick={() => setShowProfile(false)}>Close</button>
          </section>
        </div>
      )}

      {selectedAssignment && (
        <div className="assignment-modal" onClick={() => setSelectedAssignment(null)}>
          <section onClick={(event) => event.stopPropagation()}>
            <button type="button" className="assignment-modal-close" onClick={() => setSelectedAssignment(null)}>×</button>
            <small>Assignment {modalMode === 'view' ? 'details' : modalMode === 'edit' ? 'editor' : 'submission'}</small>
            <h2>{modalMode === 'upload' ? 'Upload submission' : selectedAssignment.title}</h2>
            {modalMode === 'view' && <><p>{selectedAssignment.topics || 'No'} topics</p><p>Due: {selectedAssignment.dueDate}</p><p>Status: {selectedAssignment.status}</p><button type="button" onClick={() => downloadAssignment(selectedAssignment)}>Download details</button><button type="button" onClick={() => setModalMode('upload')}>Upload work</button></>}
            {modalMode === 'edit' && <><label>Assignment title<input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} /></label><label>Due date<input value={editDueDate} onChange={(event) => setEditDueDate(event.target.value)} /></label><button type="button" onClick={saveAssignment}>Save changes</button></>}
            {modalMode === 'upload' && <><label className="assignment-upload-field">Choose file<input type="file" onChange={(event) => setUploadedFile(event.target.files?.[0] || null)} /></label><p>{uploadedFile ? uploadedFile.name : 'No file selected'}</p><button type="button" disabled={!uploadedFile} onClick={uploadAssignment}>Submit assignment</button></>}
          </section>
        </div>
      )}
    </div>
  );
}
