import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { registerUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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
      const data = await registerUser(formData);

      login(data.token, data.user);

      toast.success("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-[var(--text-secondary)] mt-3">
          Start your financial journey with FinPilot AI
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

        </form>

        <p className="text-center mt-8 text-[var(--text-secondary)]">

          Already have an account?

          <Link
            to="/login"
            className="text-[var(--primary)] ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;