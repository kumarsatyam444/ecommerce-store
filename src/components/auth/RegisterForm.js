 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validation';
import Loader from '../common/Loader';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      
      if (result.success) {
        navigate('/');
      } else {
        setFieldError('email', 'Registration failed. Please try again.');
      }
    } catch (error) {
      setFieldError('email', 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join us today</p>
      </div>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

                 <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="auth-link">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="auth-link">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? <Loader size="small" /> : 'Create Account'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
