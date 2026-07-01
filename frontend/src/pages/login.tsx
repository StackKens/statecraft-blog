import { useState } from "react";
import Input from "../components/ui/Input";

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>

          <Input
            type="email"
            value={email}
            placeholder="you@example.com"
            className="border border-emerald-300 px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>

          <Input
            type="password"
            value={password}
            placeholder="Enter your password"
            className="border border-emerald-300 px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 text-white py-2 rounded-xl cursor-pointer font-medium hover:bg-emerald-800 transition"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">Forgot password?</p>
    </>
  );
}
