 
import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const CartSummary = ({ showCheckoutButton = true, onCheckout }) => {
  const { getCartTotal, getCartItemsCount, cartItems } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-line">
        <span>Subtotal ({getCartItemsCount()} items)</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      
      <div className="summary-line">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </div>
      
      <div className="summary-line">
        <span>Tax</span>
        <span>{formatPrice(tax)}</span>
      </div>
      
      <div className="summary-line total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {subtotal < 100 && (
        <div className="free-shipping-notice">
          Add {formatPrice(100 - subtotal)} more for free shipping!
        </div>
      )}

      {showCheckoutButton && (
        <button 
          className="btn btn-primary checkout-btn"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
