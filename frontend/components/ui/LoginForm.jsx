import React from 'react';

export function LoginForm() {
  return (
    <div className="max-w-sm mx-auto bg-white p-6 ">
      <h2 className="text-2xl text-blue-600 font-semibold">Login</h2>
      <p className="text-gray-600 mt-1">Welcome back! Enter your details.</p>
      
      <form className="mt-6">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Your Email</label>
          <input
            type="email"
            placeholder="name@mail.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="********"
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
            I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a>
          </label>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-700">
         Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-blue-500">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
