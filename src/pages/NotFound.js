import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          
          <div className="error-message">
            <h1>Page Not Found</h1>
            <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
          </div>

          <div className="error-actions">
            <Link to="/" className="btn btn-primary btn-large">
              Go Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-large"
            >
              Go Back
            </button>
          </div>

          <div className="helpful-links">
            <h3>You might be looking for:</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/deals">Special Deals</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
