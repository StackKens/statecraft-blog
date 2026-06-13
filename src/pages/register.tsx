import { useState } from "react";
import Input from "../components/ui/Input";

interface RegisterProps {
  onClose: () => void;
}

export default function Register({ onClose }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={name}
        placeholder="Full Name"
        className="border border-emerald-300 px-3 py-2"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="email"
        value={email}
        placeholder="you@example.com"
        className="border border-emerald-300 px-3 py-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        value={password}
        placeholder="Create a password"
        className="border border-emerald-300 px-3 py-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-emerald-700 text-white py-2 rounded-xl font-medium hover:bg-emerald-800 transition"
      >
        Create Account
      </button>
    </form>
  );
}
