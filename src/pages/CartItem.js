import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      <div className="item-details">
        <Link to={`/product/${item.id}`} className="item-name">
          {item.name}
        </Link>
        <p className="item-category">{item.category}</p>
        <p className="item-price">{formatPrice(item.price)}</p>
      </div>

      <div className="item-quantity">
        <div className="quantity-controls">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="quantity-btn"
          >
            -
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
      </div>

      <div className="item-total">
        <span className="total-price">{formatPrice(item.price * item.quantity)}</span>
      </div>

      <div className="item-actions">
        <button
          onClick={() => removeFromCart(item.id)}
          className="remove-btn"
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
