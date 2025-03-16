/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    // Log the data being sent
    console.log("Sending data:", formData);

    try {
      setLoading(true);
      const response = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Get the full response text
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      // Try to parse as JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Registration failed with status ${response.status}`
        );
      }

      // Switch to verification mode
      setVerificationMode(true);
    } catch (err: any) {
      console.error("Error details:", err);
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch("/api/v1/user/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      // Redirect to login page after successful verification
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v1/user/resendcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification code");
      }

      alert("Verification code resent. Please check your email.");
    } catch (err: any) {
      setError(err.message || "An error occurred while resending the code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full font-display tracking-tight relative transition duration-150">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md bg-[#D1D5DB] p-8 shadow-lg rounded-md">
          {verificationMode ? (
            <form className="relative" onSubmit={handleVerify}>
              <h2 className="text-3xl text-gray-800 font-bold">
                Verify Your Account
              </h2>
              <p className="mt-2 text-gray-600">
                Please enter the verification code sent to your email
              </p>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-4">
                <label
                  htmlFor="verificationCode"
                  className="block mb-2 text-gray-800 text-sm font-semibold"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="justify-center relative z-10 flex items-center px-3 space-x-3 text-white transition duration-500 transform rounded-md shadow-sm whitespace-nowrap hover:shadow-md bg-[#82239d] hover:bg-[#89CFF0] hover:text-black py-3 mt-5 w-full font-medium"
              >
                <span>{loading ? "Verifying..." : "Verify Account"}</span>
              </button>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={resendVerificationCode}
                  disabled={loading}
                  className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm"
                >
                  Resend verification code
                </button>
              </div>
            </form>
          ) : (
            <form className="relative" onSubmit={handleSubmit}>
              <h2 className="text-3xl text-gray-800 font-bold">
                Create an account
              </h2>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-gray-800 text-sm font-semibold"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-gray-800 text-sm font-semibold"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                    required
                  />
                </div>
              </div>
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
                  value={formData.email}
                  onChange={handleChange}
                  className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
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
                  value={formData.password}
                  onChange={handleChange}
                  className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-gray-800 text-sm font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="border w-full px-4 py-2 rounded-md transition duration-150 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                  required
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
                type="submit"
                disabled={loading}
                className="justify-center relative z-10 flex items-center px-3 space-x-3 text-white transition duration-500 transform rounded-md shadow-sm whitespace-nowrap hover:shadow-md bg-[#82239d] hover:bg-[#89CFF0] hover:text-black py-3 mt-5 w-full font-medium"
              >
                <span>{loading ? "Signing up..." : "Sign up"}</span>
              </button>
            </form>
          )}
          {!verificationMode && (
            <section className="w-full pt-4 text-sm text-gray-700 text-center">
              Already have an account?
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-900 font-semibold ml-2"
              >
                Log in now
              </a>
            </section>
          )}
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
