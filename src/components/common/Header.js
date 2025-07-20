import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../contexts/ProductContext';
import { debounce } from '../../utils/helpers';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { updateFilters } = useProducts();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const cartItemsCount = getCartItemsCount();

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    updateFilters({ searchQuery: query });
    if (query && window.location.pathname !== '/products') {
      navigate('/products');
    }
  }, 300);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ searchQuery });
    navigate('/products');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" className="logo">
              <span className="logo-icon">🛍️</span>
              <span className="logo-text">ShopEasy</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="header-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className="header-nav">
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
            <Link to="/deals" className="nav-link">
              Deals
            </Link>
          </nav>

          {/* User Actions */}
          <div className="header-actions">
            {/* Cart */}
            <Link to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="user-avatar"
                >
                  <img src={user?.avatar} alt={user?.name} />
                  <span className="user-name">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/profile/orders" className="dropdown-item">
                      Orders
                    </Link>
                    <Link to="/profile/wishlist" className="dropdown-item">
                      Wishlist
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="mobile-menu-toggle"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <div className="mobile-search">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  🔍
                </button>
              </form>
            </div>

            <nav className="mobile-nav">
              <Link to="/products" className="mobile-nav-link">
                Products
              </Link>
              <Link to="/categories" className="mobile-nav-link">
                Categories
              </Link>
              <Link to="/deals" className="mobile-nav-link">
                Deals
              </Link>
              <Link to="/cart" className="mobile-nav-link">
                Cart ({cartItemsCount})
              </Link>
            </nav>

            {!isAuthenticated && (
              <div className="mobile-auth">
                <Link to="/login" className="btn btn-outline btn-full">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-full">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
