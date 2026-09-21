import React, { useMemo, useState } from 'react';
import './AdminUsers.css';
import PortalLogo from '../PortalLogo.jsx';

const initialUsers = [
  { id: '493853', name: 'Muhammad Rehan', email: 'rehan@student.com', role: 'Student', status: 'Active' },
  { id: '493854', name: 'Ayesha Khan', email: 'ayesha@student.com', role: 'Student', status: 'Active' },
  { id: 'T-1021', name: 'Teacher Ahmed', email: 'ahmed@staff.com', role: 'Teacher', status: 'Active' },
  { id: 'A-1001', name: 'Admin Rehan', email: 'admin@smit.com', role: 'Admin', status: 'Active' },
  { id: '493855', name: 'Hamza Ali', email: 'hamza@student.com', role: 'Student', status: 'Inactive' }
];

const menuItems = [['Dashboard', 'DB'], ['Attendance', 'AT'], ['Assignment', 'AS'], ['Quiz', 'QU'], ['Users', 'US']];

export default function AdminUsers({ onNavigate, onLogout }) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Student' });

  const visibleUsers = useMemo(() => users.filter((user) => {
    const matchesQuery = `${user.name} ${user.email} ${user.id}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (roleFilter === 'All' || user.role === roleFilter) && (statusFilter === 'All' || user.status === statusFilter);
  }), [query, roleFilter, statusFilter, users]);

  const initials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const openCreate = () => { setEditingUser(null); setForm({ name: '', email: '', role: 'Student' }); setModalOpen(true); };
  const openEdit = (user) => { setEditingUser(user); setForm({ name: user.name, email: user.email, role: user.role }); setModalOpen(true); };
  const saveUser = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editingUser) {
      setUsers((items) => items.map((user) => user.id === editingUser.id ? { ...user, ...form, name: form.name.trim(), email: form.email.trim() } : user));
    } else {
      setUsers((items) => [{ id: `USR-${1000 + items.length + 1}`, ...form, name: form.name.trim(), email: form.email.trim(), status: 'Active' }, ...items]);
    }
    setModalOpen(false);
  };
  const toggleStatus = (user) => setUsers((items) => items.map((item) => item.id === user.id ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' } : item));
  const deleteUser = (user) => { if (window.confirm(`Delete ${user.name}?`)) setUsers((items) => items.filter((item) => item.id !== user.id)); };

  return (
    <div className={`admin-users-page ${darkMode ? 'dark-mode' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="admin-users-sidebar">
        <button type="button" className="admin-users-collapse" onClick={() => setSidebarCollapsed((value) => !value)} aria-label="Toggle sidebar">{sidebarCollapsed ? '>' : '<'}</button>
        <div><PortalLogo className="admin-users-logo" /><nav className="admin-users-nav">{menuItems.map(([label, icon]) => <button type="button" key={label} className={`admin-users-nav-item ${label === 'Users' ? 'active' : ''}`} onClick={() => onNavigate?.(label)}><b>{icon}</b>{label}</button>)}</nav></div>
        <div className="admin-users-profile"><button type="button" onClick={() => setShowProfileMenu((value) => !value)}><span className="admin-users-avatar">AD</span><span><strong>Admin Rehan</strong><small>Super Admin</small></span><em>^</em></button>{showProfileMenu && <div className="admin-users-menu"><button type="button" onClick={() => setDarkMode((value) => !value)}>{darkMode ? 'LM' : 'DM'} {darkMode ? 'Light mode' : 'Dark mode'}</button><button type="button" className="logout" onClick={onLogout}>LO Logout</button></div>}</div>
      </aside>

      <main className="admin-users-main">
        <header className="admin-users-topbar"><div><span>Home</span><b>›</b><strong>Admin / Users</strong></div><button type="button" onClick={() => alert('Thank you for your feedback!')}>Feedback</button></header>
        <section className="admin-users-heading"><div><p>Admin authority</p><h1>User Management</h1><span>Manage students, teachers, and portal administrators.</span></div><button type="button" className="admin-users-primary" onClick={openCreate}>+ Add User</button></section>
        <section className="admin-users-stats"><div><strong>{users.length}</strong><span>Total Users</span></div><div><strong>{users.filter((user) => user.role === 'Student').length}</strong><span>Students</span></div><div><strong>{users.filter((user) => user.status === 'Active').length}</strong><span>Active Accounts</span></div></section>
        <section className="admin-users-panel"><div className="admin-users-filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email or ID" aria-label="Search users" /><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filter by role"><option>All</option><option>Student</option><option>Teacher</option><option>Admin</option></select><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status"><option>All</option><option>Active</option><option>Inactive</option></select></div><div className="admin-users-table"><div className="admin-users-table-head"><span>User</span><span>ID</span><span>Role</span><span>Status</span><span>Action</span></div>{visibleUsers.map((user) => <div className="admin-users-row" key={user.id}><span className="admin-users-user"><i>{initials(user.name)}</i><strong>{user.name}<small>{user.email}</small></strong></span><span>{user.id}</span><span className={`user-role ${user.role.toLowerCase()}`}>{user.role}</span><span className={`user-status ${user.status.toLowerCase()}`}>{user.status}</span><span className="admin-users-actions"><button type="button" onClick={() => openEdit(user)}>Edit</button><button type="button" onClick={() => toggleStatus(user)}>{user.status === 'Active' ? 'Disable' : 'Enable'}</button><button type="button" onClick={() => deleteUser(user)}>Delete</button></span></div>)}</div>{visibleUsers.length === 0 && <p className="admin-users-empty">No users found.</p>}</section>
      </main>

      {modalOpen && <div className="admin-users-modal" onClick={() => setModalOpen(false)}><section onClick={(event) => event.stopPropagation()}><button type="button" className="admin-users-close" onClick={() => setModalOpen(false)}>×</button><p>Admin authority</p><h2>{editingUser ? 'Edit User' : 'Add User'}</h2><label>Full name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}><option>Student</option><option>Teacher</option><option>Admin</option></select></label><button type="button" className="admin-users-primary" onClick={saveUser}>Save User</button></section></div>}
    </div>
  );
}
