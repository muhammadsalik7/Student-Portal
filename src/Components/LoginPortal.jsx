import React, { useState } from 'react';
import './LoginPortal.css';

export default function LoginPortal({ onLoginSuccess }) {
  const [role, setRole] = useState('student');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showStaffPassword, setShowStaffPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const updateCnic = (value) =>
    setCnic(value.replace(/\D/g, '').slice(0, 13));

  const updatePassword = (value) => setPassword(value);

  const validateStudentFields = () => {
    if (!/^\d{13}$/.test(cnic)) {
      return 'CNIC exactly 13 digits ka hona chahiye.';
    }

    if (password.trim().length < 5) {
      return 'Password kam az kam 5 characters ka hona chahiye.';
    }

    return '';
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const error = validateStudentFields();

    if (error) {
      return setFormError(error);
    }

    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess('student', cnic.trim());
    } else {
      alert('Student login successful.');
    }
  };

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!staffId.trim() || !staffPassword.trim()) {
      return setFormError(
        `${role === 'teacher' ? 'Teacher' : 'Admin'} ID aur Password required hain.`
      );
    }

    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(role, staffId.trim());
    } else {
      alert(`${role.toUpperCase()} login successful.`);
    }
  };

  return (
    <div className="smit-page-wrapper">
      <div className="smit-card-box">

        <div className="smit-logo-wrap">
          <div className="smit-brand-row">

            <div className="smit-icon-box">
              <svg viewBox="0 0 24 24" className="smit-cap-svg">
                <path
                  d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
                  fill="#1e3a8a"
                />
                <path
                  d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"
                  fill="#1e3a8a"
                />
              </svg>
            </div>

            <div className="smit-brand-text">
              <span className="navy-text">SM</span>

              <span className="i-wrapper">
                <span className="green-dot"></span>
                <span className="navy-text">i</span>
              </span>

              <span className="navy-text">T</span>
            </div>

          </div>

          <div className="smit-sub-title">
            SAYLANI MASS IT TRAINING
          </div>

          <div className="portal-sub-heading">
            {role === 'student' && 'Student Portal'}
            {role === 'teacher' && 'Teacher Portal'}
            {role === 'admin' && 'Admin Portal'}
          </div>
        </div>

        {/* STUDENT LOGIN */}
        {role === 'student' && (
          <form onSubmit={handleStudentSubmit} className="smit-form">

            <h2 className="form-main-title">
              Login
            </h2>

            <p className="form-desc">
              Kindly provide the CNIC number and password used during SMIT course registration.
            </p>

            <div className="field-group">
              <label>CNIC *</label>

              <input
                type="text"
                className="smit-input-field"
                value={cnic}
                onChange={(e) => updateCnic(e.target.value)}
                inputMode="numeric"
                maxLength={13}
                pattern="[0-9]{13}"
                title="CNIC exactly 13 digits ka hona chahiye"
                required
              />
            </div>

            <div className="field-group">
              <label>Password *</label>

              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="smit-input-field"
                  value={password}
                  onChange={(e) => updatePassword(e.target.value)}
                  minLength={5}
                  title="Password kam az kam 5 characters ka hona chahiye"
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="smit-submit-btn"
            >
              LOGIN
            </button>

            <div className="stacked-footer-links">

              <span
                className="portal-link-text"
                onClick={() => setRole('teacher')}
              >
                Login as Teacher
              </span>

              <span
                className="portal-link-text"
                onClick={() => setRole('admin')}
              >
                Login as Admin
              </span>

            </div>

          </form>
        )}

        {/* TEACHER / ADMIN LOGIN */}
        {(role === 'teacher' || role === 'admin') && (
          <form
            onSubmit={handleStaffSubmit}
            className="smit-form"
          >

            <h2 className="form-main-title">
              {role === 'teacher'
                ? 'Teacher Login'
                : 'Admin Login'}
            </h2>

            <p className="form-desc">
              Kindly provide your official credentials for portal verification.
            </p>

            <div className="field-group">

              <label>
                {role === 'teacher'
                  ? 'Teacher ID/Email *'
                  : 'Admin ID/Email *'}
              </label>

              <input
                type="text"
                className="smit-input-field"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                required
              />

            </div>

            <div className="field-group">

              <label>Password *</label>

              <div className="password-container">

                <input
                  type={showStaffPassword ? 'text' : 'password'}
                  className="smit-input-field"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowStaffPassword(!showStaffPassword)
                  }
                >
                  {showStaffPassword ? '👁️' : '👁️‍🗨️'}
                </button>

              </div>

            </div>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="smit-submit-btn"
            >
              {role === 'teacher'
                ? 'LOGIN AS TEACHER'
                : 'LOGIN AS ADMIN'}
            </button>

            <div className="stacked-footer-links">

              <span
                className="portal-link-text center-back"
                onClick={() => setRole('student')}
              >
                Back to Student Portal
              </span>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}