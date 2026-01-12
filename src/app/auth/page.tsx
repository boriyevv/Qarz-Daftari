"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  if (loading) return <div className="p-6">Loading...</div>;

  const submit = async () => {
    setError("");
    try {
      await login(email, password);
    } catch (e: any) {
      setError(e.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm border p-6 rounded">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}

        <button
          onClick={submit}
          className="w-full bg-black text-white py-2"
        >
          Login
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Accountingiz bo‘lmasa administratorga murojaat qiling
        </p>
      </div>
    </div>
  );
}
