import { NavbarItem } from "../../config/navbar";

export default function Welcome() {
  return (
    <div className="items-center justify-between py-6 px-4 md:px-8 lg:px-16 h-16 flex sticky top-0 z-50 w-full shadow-sm cursor-pointer">
      <div>
        <p className="text-2xl font-bold tracking-tight text-emerald-700">
          StateCraftBlog
        </p>
      </div>

      <div className="flex px-3 gap-6 text-sm font-medium text-gray-700 ">
        {NavbarItem.map((item) => (
          <nav className=" hover:text-emerald-700 " key={item.label}>
            {item.label}
          </nav>
        ))}
      </div>
    </div>
  );
}
