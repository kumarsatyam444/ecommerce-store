 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validation';
import Loader from '../common/Loader';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        navigate('/');
      } else {
        setFieldError('email', 'Invalid email or password');
      }
    } catch (error) {
      setFieldError('email', 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? <Loader size="small" /> : 'Sign In'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
