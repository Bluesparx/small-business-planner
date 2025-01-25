import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';  // Import the loader component
import { userLogin } from '../apiRequest';

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      setIsLoading(true);  // Show loader
      const response = await userLogin({ email, password });
      
      if (response.token && response.user) {
        localStorage.setItem('jwtToken', response.token);  // Save the JWT token
        localStorage.setItem('user', JSON.stringify(response.user));  // Save user data
      } else {
        setIsLoading(false);  // Hide loader
        handleError('Invalid response structure');
        return;
      }

      handleSuccess('Login successful!');
      setTimeout(() => {
        setIsLoading(false);  // Hide loader
        navigate('/dash');
      }, 1000);
    } catch (err) {
      setIsLoading(false);  // Hide loader
      handleError(err.message || 'Network error occurred');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-[70vh] pt-8">
        <div className="w-full max-w-md p-8  rounded-lg shadow-lg">
          <div className="max-w-sm mx-auto  p-6">
            <h2 className="text-2xl text-blue-600 font-semibold">Login</h2>
            <p className="text-gray-600 mt-1">
              Nice to meet you again! Enter your details.
            </p>

            <form className="mt-6" onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  onChange={handleChange}
                  value={loginInfo.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  name="password"
                  onChange={handleChange}
                  value={loginInfo.password}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-blue-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  padding: '12px 0',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#1E40AF')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = '#2563EB')
                }
              >
                {isLoading ? 'Logging in...' : 'Login'}  {/* Show loading text */}
              </button>

              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{' '}
                <a href="signup" className="text-blue-500">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Display the loader when isLoading is true */}
      {isLoading && <Loader />}

      <ToastContainer />
    </div>
  );
};

export default LoginForm;
