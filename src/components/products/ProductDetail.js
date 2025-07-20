 
import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiShare2, FiZoomIn } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useCart } from '../../hooks/useCart';
import { formatPrice, calculateDiscount, generateStars } from '../../utils/helpers';

const ProductDetail = ({ product, isQuickView = false }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  if (!product) return null;

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={`product-detail ${isQuickView ? 'quick-view' : ''}`}>
      <div className="product-images">
        <div className="main-image">
          <LazyLoadImage
            src={product.images[selectedImage]}
            alt={product.name}
            effect="blur"
          />
          {discount > 0 && (
            <span className="discount-badge">-{discount}%</span>
          )}
          <button className="zoom-btn">
            <FiZoomIn />
          </button>
        </div>
        
        {product.images.length > 1 && (
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <LazyLoadImage src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        
        <div className="product-rating">
          <div className="stars">
            {generateStars(product.rating).map((star, index) => (
              <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                {star}
              </span>
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <p className="product-description">{product.description}</p>

        {product.features && (
          <div className="product-features">
            <h4>Key Features:</h4>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="product-stock">
          {product.inStock ? (
            <span className="in-stock">
              ✓ In Stock ({product.stockQuantity} available)
            </span>
          ) : (
            <span className="out-of-stock">✗ Out of Stock</span>
          )}
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stockQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="btn btn-primary add-to-cart"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FiShoppingCart />
              Add to Cart
            </button>
            
            <button 
              className={`btn btn-outline wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
            
            <button className="btn btn-outline share">
              <FiShare2 />
              Share
            </button>
          </div>
        </div>

        {!isQuickView && (
          <div className="product-tabs">
            <div className="tab-headers">
              <button 
                className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews})
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-pane">
                  <p>{product.description}</p>
                  {product.features && (
                    <div>
                      <h4>Features:</h4>
                      <ul>
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="tab-pane">
                  {product.specifications ? (
                    <table className="specifications-table">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No specifications available.</p>
                  )}
                </div>
              )}

                      {activeTab === 'reviews' && (
                <div className="tab-pane">
                  <div className="reviews-summary">
                    <div className="rating-overview">
                      <div className="average-rating">
                        <span className="rating-number">{product.rating}</span>
                        <div className="stars">
                          {generateStars(product.rating).map((star, index) => (
                            <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                              {star}
                            </span>
                          ))}
                        </div>
                        <span className="total-reviews">{product.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="reviews-list">
                    <p>Reviews feature coming soon...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
