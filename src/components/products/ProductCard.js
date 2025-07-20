 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useCart } from '../../hooks/useCart';
import { formatPrice, calculateDiscount, generateStars } from '../../utils/helpers';
import Modal from '../common/Modal';
import ProductDetail from './ProductDetail';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  if (viewMode === 'list') {
    return (
      <>
        <div className="product-card list-view">
          <div className="product-image">
            <LazyLoadImage
              src={product.images[0]}
              alt={product.name}
              effect="blur"
            />
            {discount > 0 && (
              <span className="discount-badge">-{discount}%</span>
            )}
          </div>
          
          <div className="product-info">
            <Link to={`/product/${product.id}`} className="product-title">
              <h3>{product.name}</h3>
            </Link>
            
            <div className="product-rating">
              <div className="stars">
                {generateStars(product.rating).map((star, index) => (
                  <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                    {star}
                  </span>
                ))}
              </div>
              <span className="rating-text">({product.reviews} reviews)</span>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            
            <div className="product-actions">
              <button 
                className="btn btn-primary add-to-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <FiShoppingCart />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                className={`btn btn-icon wishlist ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlist}
              >
                <FiHeart />
              </button>
              
              <button 
                className="btn btn-icon quick-view"
                onClick={handleQuickView}
              >
                <FiEye />
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
          title="Quick View"
          size="large"
        >
          <ProductDetail product={product} isQuickView={true} />
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="product-card grid-view">
        <div className="product-image">
          <Link to={`/product/${product.id}`}>
            <LazyLoadImage
              src={product.images[0]}
              alt={product.name}
              effect="blur"
            />
          </Link>
          
          {discount > 0 && (
            <span className="discount-badge">-{discount}%</span>
          )}
          
          <div className="product-overlay">
            <button 
              className={`btn btn-icon wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              <FiHeart />
            </button>
            
            <button 
              className="btn btn-icon quick-view"
              onClick={handleQuickView}
            >
              <FiEye />
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <Link to={`/product/${product.id}`} className="product-title">
            <h3>{product.name}</h3>
          </Link>
          
          <div className="product-rating">
            <div className="stars">
              {generateStars(product.rating).map((star, index) => (
                <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                  {star}
                </span>
              ))}
            </div>
            <span className="rating-text">({product.reviews})</span>
          </div>
          
          <div className="product-price">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          
          <button 
            className="btn btn-primary add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <FiShoppingCart />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      <Modal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        title="Quick View"
        size="large"
      >
        <ProductDetail product={product} isQuickView={true} />
      </Modal>
    </>
  );
};

export default ProductCard;
