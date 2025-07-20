import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, generateStars } from '../../utils/helpers';

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const stars = generateStars(product.rating);

  return (
    <div className={`product-card ${viewMode}`}>
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="discount-badge">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-rating">
          <div className="stars">
            {stars.map((star, index) => (
              <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                {star}
              </span>
            ))}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {viewMode === 'list' && (
          <p className="product-description">{product.description}</p>
        )}

        <button
          onClick={onAddToCart}
          className="btn btn-primary add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
