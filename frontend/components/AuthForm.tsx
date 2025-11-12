"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { AxiosError } from "axios";

interface AuthFormProps {
  type: "login" | "register";
  role: "user" | "admin";
}

export default function AuthForm({ type, role }: AuthFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = type === "register" ? "/auth/register" : "/auth/login";
      const payload =
        type === "register"
          ? form
          : { email: form.email, password: form.password };

      const res = await api.post(endpoint, payload);
      const { access_token } = res.data;

      if (!access_token) throw new Error("Invalid response from server");

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      setSuccess("Success! Redirecting...");

      setTimeout(() => {
        router.push(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }, 1500);
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      setError(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === "register"
          ? "Register as User"
          : role === "admin"
          ? "Admin Login"
          : "User Login"}
      </h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {type === "register" && (
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded-lg"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : type === "register"
            ? "Register"
            : "Login"}
        </button>
      </form>
    </div>
  );
}
