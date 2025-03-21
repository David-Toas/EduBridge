/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/v1/log/login", {
        // const response = await fetch("https://edubridge-uwk9.onrender.com/api/v1/log/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      // const data = await response.json();
//       const data = await response.json();
// console.log("Login response data:", data);


const data = await response.json();
// console.log("Login response data:", JSON.stringify(data, null, 2));



      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.data.token);

      if (data.user && data.user.id) {
        localStorage.setItem("userId", data.user.id);
      } else if (data.userId) {
        localStorage.setItem("userId", data.userId);
      } else if (data.id) {
        localStorage.setItem("userId", data.id);
      } else if (data.data && data.data.id) {
        localStorage.setItem("userId", data.data.id);
      } else if (data.data && data.data.user && data.data.user.id) {
        localStorage.setItem("userId", data.data.user.id);
      } else {
        // Log more info to see the exact structure
        // console.error("User ID not found in response:", JSON.stringify(data, null, 2));
      }

      const tokenPayload = JSON.parse(atob(data.data.token.split('.')[1]));
localStorage.setItem("userId", tokenPayload.id);
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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
              <form onSubmit={handleSubmit}>
                <h2 className="text-3xl text-gray-800 font-bold">Welcome back</h2>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-gray-800 text-sm font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                    type="email"
                    required
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
                    required
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
                  <Link href="/forgot-password" className="text-indigo-600">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center px-3 space-x-2 text-white transition duration-500 transform rounded-md shadow-sm hover:shadow-md bg-[#82239d] hover:bg-[#89CFF0] hover:text-black py-3 mt-5 w-full font-medium"
                >
                  {isLoading ? (<><Loader2 className="animate-spin mr-2"/> Signing in...</>) : "Sign in"}
                </button>
              </form>

              <section className="w-full pt-4 text-sm text-gray-700 text-center">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-900 font-semibold ml-1"
                >
                  Sign Up 
                </Link>
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