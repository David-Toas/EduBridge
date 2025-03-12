/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useState } from "react";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full font-display tracking-tight relative transition duration-150">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md bg-[#D1D5DB] p-8 shadow-lg rounded-md">
          <form className="relative">
            <h2 className="text-3xl text-gray-800 font-bold">
              Create an account
            </h2>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-gray-800 text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
              />
            </div>
            <div className="flex w-full justify-between items-center mt-4 text-sm text-gray-800 tracking-tight">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="transform scale-110 transition duration-150 focus:outline-none z-10"
                />
                <span>Remember Me</span>
              </label>
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-900 font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="button"
              className="justify-center relative z-10 flex items-center px-3 space-x-3 text-white transition duration-500 transform rounded-md shadow-sm whitespace-nowrap hover:shadow-md bg-[#82239d] hover:bg-[#89CFF0] hover:text-black py-3 mt-5 w-full font-medium"
            >
              <a
                href=""
              >
                <span>Sign up</span>
              </a>
            </button>
          </form>
          <section className="w-full pt-4 text-sm text-gray-700 text-center">
            Already have an account?
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-900 font-semibold ml-2"
            >
              Log in now
            </a>
          </section>
        </div>
      </div>
      <div className="w-full h-full overflow-hidden hidden md:block">
        <img
          src="2.jpg"
          alt="Signup"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
};

export default SignupForm;
