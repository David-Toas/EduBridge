/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div id="__nuxt">
      <div id="__layout">
        <div className="relative grid grid-cols-1 md:grid-cols-2 h-screen w-full font-display tracking-tight">
          {/* Back Button */}
          <div className="absolute left-10 top-10">
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-7 w-7 hover:text-[#D1D5DB] text-[#FACC15]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Left Side - Login Form */}
          <div className="flex items-center justify-center h-full px-6 md:px-12">
            <div className="w-full max-w-md bg-[#D1D5DB] p-8 shadow-lg rounded-md">
              <form data-ms-form="login">
                <h2 className="text-3xl text-gray-800 font-bold">Welcome back</h2>

                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-gray-800 text-sm font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    data-ms-member="email"
                    className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                    type="text"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-gray-800 text-sm font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    data-ms-member="password"
                    className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                  />
                </div>

                <div className="flex w-full justify-between items-center mt-4 text-sm text-gray-800 tracking-tight">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="transform scale-110 focus:outline-none"
                    />
                    <span> Remember Me</span>
                  </label>
                  <Link href="/" className="text-indigo-600">
                    Forgot password?
                  </Link>
                </div>

                <button className="flex items-center justify-center px-3 space-x-2 text-white transition duration-500 transform rounded-md shadow-sm hover:shadow-md bg-[#82239d] hover:bg-[#89CFF0] hover:text-black py-3 mt-5 w-full font-medium">
                  <a href="/dashboard">
                    <span>Sign in</span>
                  </a>
                </button>
              </form>

              <section className="w-full pt-4 text-sm text-gray-700 text-center">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-900 font-semibold ml-1"
                >
                  Sign Up 
                </a>
              </section>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full h-full hidden md:block">
            <img
              src="/1.jpg"
              className="w-full h-full object-cover"
              alt="Login Side Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
