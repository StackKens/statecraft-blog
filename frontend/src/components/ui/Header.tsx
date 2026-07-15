import { NavbarItem } from "../../config/navbar";
import { useAuth } from "../../context/AuthConext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setModal: React.Dispatch<React.SetStateAction<"login" | "register" | null>>;
}

export default function Header({ setModal }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="items-center justify-between py-6 px-4 md:px-8 lg:px-16 h-16 flex sticky top-0 z-50 w-full shadow-md backdrop-blur-md bg-white/80">
      <p
        className="text-2xl font-bold tracking-tight text-emerald-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        StateCraftBlog
      </p>

      <div className="flex px-3 gap-4 text-sm font-medium text-gray-700 items-center">
        {user ? (
          <>
            <button
              className="cursor-pointer text-emerald-700 hover:text-emerald-900 font-semibold"
              onClick={() => navigate("/create")}
            >
              + New Post
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-200 transition"
              title="My Account"
            >
              <span className="text-sm font-bold text-emerald-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 cursor-pointer transition text-xs"
            >
              Logout
            </button>
          </>
        ) : (
          NavbarItem.map((item) => (
            <button
              key={item.label}
              className="cursor-pointer hover:text-emerald-700"
              onClick={() =>
                setModal(item.link === "/login" ? "login" : "register")
              }
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
