import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-emerald-700 mb-4">404</p>
        <p className="text-gray-600 text-lg mb-6">Page not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-800 cursor-pointer transition"
        >
          Go back home
        </button>
      </div>
    </div>
  );
}
