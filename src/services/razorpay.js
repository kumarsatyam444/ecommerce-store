import { toast } from 'react-toastify';

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_your_key_here';

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (orderData) => {
  try {
    // In a real app, this would be an API call to your backend
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const processPayment = async (orderData, userDetails) => {
  const res = await initializeRazorpay();
  
  if (!res) {
    toast.error('Razorpay SDK failed to load');
    return { success: false };
  }

  try {
    // Create order on backend (mock for now)
    const order = await createRazorpayOrder({
      amount: orderData.amount * 100, // Convert to paise
      currency: 'INR',
    });

    const options = {
      key: RAZORPAY_KEY,
      amount: orderData.amount * 100,
      currency: 'INR',
      name: 'E-Commerce Store',
      description: 'Purchase from E-Commerce Store',
      order_id: order.id,
      handler: function (response) {
        // Payment successful
        toast.success('Payment successful!');
        return {
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on('payment.failed', function (response) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment failed:', response.error);
    });

    paymentObject.open();
    
    return new Promise((resolve) => {
      paymentObject.on('payment.success', (response) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
      });
      
      paymentObject.on('payment.failed', () => {
        resolve({ success: false });
      });
    });
    
  } catch (error) {
    console.error('Payment error:', error);
    toast.error('Payment initialization failed');
    return { success: false };
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};
