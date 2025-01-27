import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';  // Import the loader component
import { userSignUp, userLogin } from '../utils/apiRequest';
import { useAuth } from '@/utils/authProvider';

const SignUpForm = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      setIsLoading(true);
      const response = await userSignUp({ name, email, password });

      if (!response.token && !response.user) {
        handleError("Invalid Sign Up");
        return;
      } else {
        setIsLoading(false);
      }
      const logg = await userLogin({ email, password });
      console.log("Login successful", logg);
      localStorage.setItem("token", logg.token);
      login(logg.token);

      handleSuccess("Sign-up successful!");
      setTimeout(async () => {
        setIsLoading(false);
        navigate("/dash");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      handleError(err.message || "Network error occurred");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md px-8 py-4 dark:bg-[#252630] rounded-xl shadow-lg">
          <div className="max-w-sm mx-auto py-4 px-6">
            <h2 className="text-2xl text-blue-600 font-semibold">Sign Up</h2>
            <p className="text-gray-600 text-md dark:text-gray-300 mt-1">
              Nice to meet you! Enter your details to register.
            </p>

            <form className="mt-6" onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block dark:text-white/80 text-gray-700 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Name"
                  value={signupInfo.name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block dark:text-white/80 text-gray-700 text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  onChange={handleChange}
                  value={signupInfo.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block dark:text-white/80 text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  name="password"
                  onChange={handleChange}
                  value={signupInfo.password}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 dark:text-white/80 text-gray-600 text-sm">
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
                {isLoading ? "Signing Up..." : "Sign Up"}{" "}
                {/* Show loading text */}
              </button>

              <p className="text-center text-gray-500 mt-4">
                Already have an account?{" "}
                <a href="login" className="text-blue-500">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
