import { useEffect, useState } from "react";
import Header from "./components/ui/Header";
import Hero from "./components/ui/Hero";
import FilterBar from "./components/ui/FilterBar";
import { ArrowRight } from "lucide-react";
import DetailsModal from "./components/ui/DetailsModal";
import type { Post } from "./types/post";

import { fetchPosts } from "./services/postService";
export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  //fectching data
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Hero />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading posts...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-6 my-8 mx-auto max-w-2xl">
              <p className="text-red-700 font-semibold text-center">{error}</p>
              <p className="text-red-600 text-sm text-center mt-2">
                Oops! An error occurred. Please try again later.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg">No posts yet</p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full max-w-7xl mx-auto"
                >
                  <div className="relative pt-[56.25%] bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-3">
                      {post.details}
                    </p>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="mt-auto inline-flex items-center cursor-pointer gap-2 text-emerald-600 hover:text-emerald-800 font-medium text-sm transition-colors"
                    >
                      View more <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for full details */}
      <DetailsModal
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
}
