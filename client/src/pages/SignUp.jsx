import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const register = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.msg || "Registration failed");
        return;
      }

      const data = await res.json();
      navigate("/");
    } catch (error) {
      console.error("Registration error", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Layout hide="true">
      <div className="flex items-center justify-center">
        <div className="h-screen bg-cover bg-center relative bg-no-repeat">
          <div className="inline-flex items-center justify-center p-4 bg-transparent w-full sm:w-auto">
            <div className="w-full sm:min-w-[460px]">
              <div className="bg-black/40 backdrop-blur-3xl lg:max-w-[480px] z-10 p-6 relative w-full border-t-4 border-blue-600 rounded-lg">
                <div className="flex flex-col gap-4">
                  <div className="my-8">
                    <h4 className="text-white text-2xl font-semibold mb-2">
                      Sign Up
                    </h4>
                    <p className="text-gray-100 mb-9">
                      Enter your email address and password to create your
                      account.
                    </p>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={register}>
                      <div className="mb-4">
                        <label
                          htmlFor="userName"
                          className="block text-base font-semibold text-gray-200 mb-2"
                        >
                          Username
                        </label>
                        <input
                          className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
                          type="text"
                          id="userName"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="emailaddress"
                          className="block text-base font-semibold text-gray-200 mb-2"
                        >
                          Email address
                        </label>
                        <input
                          className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
                          type="email"
                          id="emailaddress"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block text-base font-semibold text-gray-200 mb-2"
                        >
                          Password
                        </label>
                        <input
                          className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-6 text-center">
                        <button
                          className="w-full inline-flex items-center justify-center px-6 py-2 backdrop-blur-2xl bg-white/20 text-white rounded-lg transition-all duration-500 group hover:bg-blue-600/60 hover:text-white mt-5"
                          type="submit"
                        >
                          Register{" "}
                        </button>
                      </div>
                    </form>
                  </div>

                  <footer className="text-center mt-6">
                    <p className="text-base inline-block px-2 py-1 text-gray-100">
                      Already have an account?{" "}
                      <Link to="/login" className="text-white ms-1">
                        <b>Login</b>
                      </Link>
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
