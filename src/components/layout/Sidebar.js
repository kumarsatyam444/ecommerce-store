import React from 'react';
import { FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose, title, children, position = 'left' }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${position} ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>{title}</h3>
          <button className="sidebar-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="sidebar-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
