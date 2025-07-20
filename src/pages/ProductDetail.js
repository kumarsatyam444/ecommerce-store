import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { formatPrice, generateStars } from '../utils/helpers';
import Loader from '../components/common/Loader';
import ProductCard from '../components/products/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      const foundProduct = getProductById(id);
      
      if (!foundProduct) {
        navigate('/404');
        return;
      }
      
      setProduct(foundProduct);
      
      // Get related products from same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
      setLoading(false);
    };

    fetchProduct();
  }, [id, getProductById, products, navigate]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const stars = generateStars(product.rating);

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="breadcrumb-link">
            Products
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate(`/products?category=${product.category}`)} 
            className="breadcrumb-link"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Product Info */}
        <div className="product-info">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="main-product-image"
              />
            </div>
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {stars.map((star, index) => (
                    <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                      {star}
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-options">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-actions">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-outline btn-large"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary btn-large"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <span>30-day return policy</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
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
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>Product Description</h3>
                <p>{product.longDescription || product.description}</p>
                <ul>
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Modern design</li>
                  <li>Easy to use</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-pane">
                <h3>Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Brand</td>
                      <td>{product.brand || 'Generic'}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>{product.weight || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td>Dimensions</td>
                      <td>{product.dimensions || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="rating-number">{product.rating}</span>
                    <div className="stars">
                      {stars.map((star, index) => (
                        <span key={index} className={star === '★' ? 'filled' : 'empty'}>
                          {star}
                        </span>
                      ))}
                    </div>
                    <span>Based on {product.reviews || 0} reviews</span>
                  </div>
                </div>
                <div className="reviews-list">
                  <p>Reviews feature coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => addToCart(relatedProduct)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
 
