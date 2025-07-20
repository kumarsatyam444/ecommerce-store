import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { formatPrice, isValidEmail } from '../utils/helpers';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Options
    sameAsShipping: true,
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Validate shipping information
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    if (step === 2) {
      // Validate payment information
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;

    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success', {
        state: {
          orderNumber: `ORD-${Date.now()}`,
          total: total,
          items: cart.length
        }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Shipping</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Payment</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Review</span>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Shipping Information</h2>
                <form className="shipping-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                      placeholder="Street address"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? 'error' : ''}
                      />
                      {errors.state && <span className="error-message">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={errors.zipCode ? 'error' : ''}
                      />
                      {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary btn-large"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

                     {currentStep === 2 && (
              <div className="step-content">
                <h2>Payment Information</h2>
                <form className="payment-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={errors.cardNumber ? 'error' : ''}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={errors.expiryDate ? 'error' : ''}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={errors.cvv ? 'error' : ''}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardName">Cardholder Name *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={errors.cardName ? 'error' : ''}
                      placeholder="Name as it appears on card"
                    />
                    {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                      />
                      <span>Save payment information for future purchases</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn btn-outline btn-large"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary btn-large"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h2>Review Your Order</h2>
                
                <div className="order-review">
                  <div className="shipping-summary">
                    <h3>Shipping Address</h3>
                    <div className="address-card">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.email}</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-link"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="payment-summary">
                    <h3>Payment Method</h3>
                    <div className="payment-card">
                      <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                      <p>{formData.cardName}</p>
                      <p>Expires {formData.expiryDate}</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-link"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="items-summary">
                    <h3>Order Items</h3>
                    <div className="review-items">
                      {cart.map((item) => (
                        <div key={`${item.id}-${Date.now()}`} className="review-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="place-order-form">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn btn-outline btn-large"
                    >
                      Back to Payment
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="btn btn-primary btn-large"
                    >
                      {processing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={`${item.id}-summary`} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-total">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-calculations">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
 