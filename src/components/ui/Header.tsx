import { NavbarItem } from "../../config/navbar";
import { useTheme } from "../../context/ThemeContext";

export default function Welcome() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={`items-center justify-between py-6 px-4 md:px-8 lg:px-16 h-16 flex sticky top-0 z-50 w-full shadow-md cursor-pointer backdrop-blur-md ${theme === "dark" ? "bg-gray-950 text-white" : "bg-white/80 "}`}
    >
      <div>
        <p className="text-2xl font-bold tracking-tight text-emerald-700">
          StateCraftBlog
        </p>
      </div>

      <div className="flex px-3 gap-6 text-sm font-medium text-gray-700">
        {NavbarItem.map((item) => (
          <nav className="hover:text-emerald-700" key={item.label}>
            {item.label}
          </nav>
        ))}
      </div>
      <button onClick={toggleTheme} className="cursor-pointer">
        Theme
      </button>
    </div>
  );
}
