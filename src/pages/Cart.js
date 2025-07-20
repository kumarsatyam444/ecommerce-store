 import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/helpers';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const { cart, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/products" className="btn btn-primary btn-large">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
          <p>{getCartItemsCount()} items in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <h2>Items ({getCartItemsCount()})</h2>
              <button
                onClick={clearCart}
                className="btn btn-outline btn-small"
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-list">
              {cart.map((item) => (
                <CartItem key={`${item.id}-${Date.now()}`} item={item} />
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({getCartItemsCount()} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="free-shipping">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {shipping > 0 && (
                <div className="shipping-notice">
                  <p>💡 Add {formatPrice(50 - subtotal)} more for FREE shipping!</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="btn btn-primary btn-full btn-large"
              >
                Proceed to Checkout
              </button>

              <div className="payment-methods">
                <p>We accept:</p>
                <div className="payment-icons">
                  <span>💳</span>
                  <span>🏦</span>
                  <span>📱</span>
                </div>
              </div>
            </div>

            <div className="continue-shopping">
              <Link to="/products" className="btn btn-outline btn-full">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="cart-features">
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <div>
              <h4>Secure Checkout</h4>
              <p>Your information is protected with SSL encryption</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">↩️</span>
            <div>
              <h4>Easy Returns</h4>
              <p>30-day return policy on all items</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">📞</span>
            <div>
              <h4>24/7 Support</h4>
              <p>Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

