"use client";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userData, error, loading, login } = useApi();
  const router = useRouter();

  React.useEffect(() => {
    if (userData) {
      router.push("/");
    }
  }, [userData]);

  const handleLogin = async () => {
    await login({ username, password });
  };

  return (
    <div className="flex flex-col p-10 border-black border-2 mx-auto mt-10 w-1/2">
      <h1 className="text-2xl">Login</h1>
      <input
        className="mt-2 border-black border-2"
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        className="mt-2 border-black border-2"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />

      <button
        disabled={loading}
        onClick={handleLogin}
        className="mt-2 bg-slate-600 text-white py-2 px-4"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}
