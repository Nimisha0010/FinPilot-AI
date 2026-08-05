import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser(formData);

      login(data.token, data.user);

      toast.success("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-[var(--text-secondary)] mt-3">
          Login to continue using FinPilot AI
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>

        <p className="text-center mt-8 text-[var(--text-secondary)]">

          Don't have an account?

          <Link
            to="/register"
            className="text-[var(--primary)] ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;