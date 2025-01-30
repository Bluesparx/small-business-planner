import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/apiRequest";
import { useAuth } from "@/utils/authProvider";
import Loader from "../Components/Loader";
import Image8 from '../assets/image8.png'

const LoginForm = () => {
  const { login } = useAuth();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
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
      toast.success("Login successful!");
      login(response.token);
      setTimeout(() => navigate("/dash"), 1000);
    } catch (error) {
      console.error("Could not log in:", error);
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row bg-white dark:bg-[#252630] shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
        
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-200">
          <img
            src={Image8}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl text-blue-600 font-semibold text-center">Login</h2>
          
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block  text-sm font-medium mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@mail.com"
                onChange={handleChange}
                value={loginInfo.email}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block  text-sm font-medium mb-2">Password</label>
              <input

                type="password"
                placeholder="********"
                name="password"
                onChange={handleChange}
                value={loginInfo.password}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-700"
              />
            </div>
             
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex items-center mb-4">
              <input type="checkbox" id="terms" required className="h-4 w-4 text-blue-500 border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-200"
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

      
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
