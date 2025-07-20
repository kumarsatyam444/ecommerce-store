 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/common/Loader';
import { formatPrice } from '../utils/helpers';

const Home = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Get featured products (highest rated)
      const featured = products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
      
      setFeaturedProducts(featured);

      // Get unique categories
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      
      setCategories(uniqueCategories.slice(0, 6));
    }
  }, [products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>Welcome to Our Store</h1>
              <p>Discover amazing products at unbeatable prices</p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary btn-large">
                  Shop Now
                </Link>
                <Link to="/products" className="btn btn-outline btn-large">
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Shopping" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure payment processing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our wide range of product categories</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="category-card"
              >
                <div className="category-image">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=300&h=200&fit=crop`}
                    alt={category}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=' + category;
                    }}
                  />
                </div>
                <div className="category-info">
                  <h3>{category}</h3>
                  <span>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Check out our most popular items</p>
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest deals and updates</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
