import Input from "./Input";
import Wrapper from "./Wrapper";
export default function Hero() {
  return (
    <Wrapper>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <p className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Discover ideas worth sharing
          </p>

          <p className="text-gray-600 text-lg max-w-xl">
            Explore thoughtful stories, insights, and perspectives from people
            around the world.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-auto flex items-center">
          <Input
            type="text"
            placeholder="Search posts..."
            className="
              w-full lg:w-87.5
              border border-gray-300
              rounded-full
              px-5 py-3
              text-sm
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-300
              transition-all
            "
          />
        </div>
      </div>
    </Wrapper>
  );
}
