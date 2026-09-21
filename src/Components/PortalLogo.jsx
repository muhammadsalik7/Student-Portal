import React from 'react';
import './PortalLogo.css';

export default function PortalLogo({ className = '' }) {
  return (
    <div className={`${className} portal-logo`}>
      <div className="portal-logo-row">
        <span className="portal-logo-cap" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-7 10.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z" />
          </svg>
        </span>
        <strong><span>SM</span><i>i</i><span>T</span></strong>
      </div>
      <small>Saylani Mass IT Training</small>
    </div>
  );
}
