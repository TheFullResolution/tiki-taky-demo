import React from 'react';
import './TikiTakyHeader.css';

/**
 * TikiTaky-styled header component
 */
export const TikiTakyHeader: React.FC = () => {
  return (
    <header className="tikitaky-header">
      <div className="tikitaky-container">
        <div className="tikitaky-header-content">
          <div className="tikitaky-header-logo">
            <span className="tikitaky-logo-text">tikitaky</span>
          </div>
          <nav className="tikitaky-header-nav">
            <a href="#" className="tikitaky-nav-link">Support</a>
            <div className="tikitaky-user-menu">
              <div className="tikitaky-user-avatar"></div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TikiTakyHeader;