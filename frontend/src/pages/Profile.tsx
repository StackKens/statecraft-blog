import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthConext";
import { getUserPosts } from "../services/postService";
import type { Post } from "../types/post";
import { ArrowRight, LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">You must be logged in</p>
          <button
            onClick={() => navigate("/")}
            className="text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserPosts();
        setPosts(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
          >
            &larr; Back
          </button>
          <h1 className="text-lg font-bold text-gray-800">My Account</h1>
          <div />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <p className="text-gray-500 text-sm">
              {posts.length} {posts.length === 1 ? "post" : "posts"} published
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-4">My Posts</h2>

        {loading && (
          <p className="text-gray-400 text-sm">Loading posts...</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't published any posts yet</p>
            <button
              onClick={() => navigate("/create")}
              className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-800 cursor-pointer transition"
            >
              Create your first post
            </button>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md p-4 flex gap-4"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-emerald-600">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
