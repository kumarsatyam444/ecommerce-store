 
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiDownload, FiMail } from 'react-icons/fi';
import { formatPrice } from '../utils/helpers';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container">
        <div className="order-not-found">
          <h2>Order not found</h2>
          <p>We couldn't find your order details.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="order-success">
        <div className="success-header">
          <FiCheckCircle className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h3>Order Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Order ID:</label>
                <span>#{order.id}</span>
              </div>
              <div className="info-item">
                <label>Order Date:</label>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <label>Payment ID:</label>
                <span>{order.paymentId}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className="status confirmed">{order.status}</span>
              </div>
            </div>
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <div className="address">
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            <div className="items-list">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.images[0]} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>{formatPrice(order.amount - (order.amount > 100 ? 0 : 10) - (order.amount * 0.08))}</span>
              </div>
              <div className="summary-line">
                <span>Shipping:</span>
                <span>{order.amount > 100 ? 'Free' : formatPrice(10)}</span>
              </div>
              <div className="summary-line">
                <span>Tax:</span>
                <span>{formatPrice(order.amount * 0.08)}</span>
              </div>
              <div className="summary-line total">
                <span>Total:</span>
                <span>{formatPrice(order.amount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-actions">
          <button className="btn btn-outline">
            <FiDownload />
            Download Invoice
          </button>
          <button className="btn btn-outline">
            <FiMail />
            Email Receipt
          </button>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive an email confirmation shortly</li>
            <li>We'll send you tracking information once your order ships</li>
            <li>Estimated delivery: 3-5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
