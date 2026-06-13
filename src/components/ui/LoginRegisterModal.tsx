import Login from "../../pages/login";
import Register from "../../pages/register";
import { X } from "lucide-react";

type AuthForm = "login" | "register";

interface LoginRegisterModalProps {
  activeForm: AuthForm;
  onSwitch: (form: AuthForm) => void;
  onClose: () => void;
}

export default function LoginRegisterModal({
  activeForm,
  onSwitch,
  onClose,
}: LoginRegisterModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={16} className="cursor-pointer" />
        </button>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => onSwitch("login")}
            className={`flex-1 py-2 rounded-md text-sm font-medium cursor-pointer transition ${
              activeForm === "login" ? "bg-white shadow" : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => onSwitch("register")}
            className={`flex-1 py-2 rounded-md text-sm font-medium cursor-pointer transition ${
              activeForm === "register" ? "bg-white shadow" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {activeForm === "login" ? (
          <Login onClose={onClose} />
        ) : (
          <Register onClose={onClose} />
        )}
      </div>
    </div>
  );
}
