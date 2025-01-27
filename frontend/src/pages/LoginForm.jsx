import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';  // Import the loader component
import { userLogin } from '../utils/apiRequest';
import { useAuth } from '@/utils/authProvider';

const LoginForm = () => {
  const { login } = useAuth();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const { email, password } = loginInfo;
  
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
  
    setError("");
    setIsLoading(true);
  
    try {
      const response = await userLogin({ email, password });
      console.log("Login successful", response);
      localStorage.setItem("token", response.token);
      login(response.token);
      navigate("/dash");
    } catch (error) {
      console.error("Could not log in:", error);
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
  <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md px-8 py-4 dark:bg-[#252630] rounded-xl shadow-lg">
          <div className="max-w-sm mx-auto p-8 ">
            <h2 className="text-3xl text-blue-600 font-semibold">Login</h2>
            

            <form className="mt-6" onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="dark:text-white/80 block text-gray-700 text-sm font-medium mb-2">
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
                <label className=" dark:text-white/80 block text-gray-700 text-sm font-medium mb-2">
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

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className=" dark:text-white/80ml-2 text-gray-600 text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#2563EB",
                  color: "white",
                  padding: "12px 0",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1E40AF")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{" "}
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
