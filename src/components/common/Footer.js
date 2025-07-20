 
import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-Store</h3>
            <p>Your one-stop destination for quality products at amazing prices.</p>
            <div className="social-links">
  <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
  <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
  <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
</div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/profile">My Account</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
  <li><Link to="/contact">Contact Us</Link></li>
  <li><Link to="/faq">FAQ</Link></li>
  <li><Link to="/shipping">Shipping Info</Link></li>
  <li><Link to="/returns">Returns</Link></li>
</ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FiMapPin />
                <span>123 E-commerce St, Digital City, DC 12345</span>
              </div>
              <div className="contact-item">
                <FiPhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail />
                <span>support@estore.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 E-Store. All rights reserved.</p>
          <div className="footer-links">
  <Link to="/privacy-policy">Privacy Policy</Link>
  <Link to="/terms">Terms of Service</Link>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
