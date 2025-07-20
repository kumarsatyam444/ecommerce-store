 
import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="loader">
        <div className="loader-spinner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
