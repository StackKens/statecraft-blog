import { useState } from "react";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthConext";

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await auth?.login(email, password);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 text-white py-2 rounded-xl cursor-pointer font-medium hover:bg-emerald-800 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">Forgot password?</p>
    </>
  );
}
