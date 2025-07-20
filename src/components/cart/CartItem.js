 
import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
        <LazyLoadImage
          src={item.images[0]}
          alt={item.name}
          effect="blur"
        />
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">{formatPrice(item.price)}</p>
        {!item.inStock && (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>

      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <FiMinus />
        </button>
        <span className="quantity">{item.quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.stockQuantity}
        >
          <FiPlus />
        </button>
      </div>

      <div className="item-total">
        <span className="total-price">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>

      <button
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

export default CartItem;
