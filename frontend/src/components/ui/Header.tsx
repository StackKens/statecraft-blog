import { NavbarItem } from "../../config/navbar";
import { useTheme } from "../../context/ThemeContext";

interface HeaderProps {
  setModal: React.Dispatch<React.SetStateAction<"login" | "register" | null>>;
}

export default function Header({ setModal }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`items-center justify-between py-6 px-4 md:px-8 lg:px-16 h-16 flex sticky top-0 z-50 w-full shadow-md backdrop-blur-md ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-white/80"
      }`}
    >
      <p className="text-2xl font-bold tracking-tight text-emerald-700">
        StateCraftBlog
      </p>

      <div className="flex px-3 gap-6 text-sm font-medium text-gray-700">
        {NavbarItem.map((item) => (
          <button
            key={item.label}
            className="cursor-pointer hover:text-emerald-700"
            onClick={() =>
              setModal(item.link === "/login" ? "login" : "register")
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="cursor-pointer hover:text-emerald-800"
      >
        Theme
      </button>
    </div>
  );
}
