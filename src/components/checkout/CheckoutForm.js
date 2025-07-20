 
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { checkoutSchema } from '../../utils/validation';
import { processPayment } from '../../services/razorpay';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import CartSummary from '../cart/CartSummary';

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: 'India',
    paymentMethod: 'razorpay',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        amount: getCartTotal() + (getCartTotal() > 100 ? 0 : 10) + (getCartTotal() * 0.08),
        items: cartItems,
        shippingAddress: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
      };

      const userDetails = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
      };

      const paymentResult = await processPayment(orderData, userDetails);
      
      if (paymentResult.success) {
        // Save order to backend (mock for now)
        const order = {
          id: Date.now().toString(),
          ...orderData,
          paymentId: paymentResult.paymentId,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };

        // Clear cart
        clearCart();
        
        // Redirect to success page
        navigate('/order-success', { state: { order } });
        toast.success('Order placed successfully!');
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before checkout.</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <div className="checkout-content">
        <div className="checkout-main">
          <h2>Checkout</h2>
          
          <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-section">
                  <h3>Shipping Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                      />
                      <ErrorMessage name="firstName" component="div" className="error-message" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                      />
                      <ErrorMessage name="lastName" component="div" className="error-message" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage name="email" component="div" className="error-message" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                      />
                      <ErrorMessage name="phone" component="div" className="error-message" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                    />
                    <ErrorMessage name="address" component="div" className="error-message" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                      />
                      <ErrorMessage name="city" component="div" className="error-message" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <Field
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                      />
                      <ErrorMessage name="state" component="div" className="error-message" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <Field
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className="form-control"
                      />
                      <ErrorMessage name="zipCode" component="div" className="error-message" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Payment Method</h3>
                  <div className="payment-methods">
                    <label className="payment-option">
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                      />
                      <span>Razorpay (Cards, UPI, Wallets)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary place-order-btn"
                  disabled={isSubmitting || isProcessing}
                >
                  {isSubmitting || isProcessing ? (
                    <Loader size="small" text="Processing..." />
                  ) : (
                    'Place Order'
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="checkout-sidebar">
          <CartSummary showCheckoutButton={false} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
