"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border p-6 rounded-xl space-y-4 border-black "
      >
        <h1 className="text-xl font-bold text-center text-black">Login</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="text-black w-full rounded-xl border px-3 py-2 border-black text-black placeholder-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="text-black w-full rounded-xl border border-black text-black placeholder-black px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded-xl">
          Login
        </button>

        <p className="text-sm text-center text-black">
          Don’t have an account?{" "}
          <a href="/register" className="underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
