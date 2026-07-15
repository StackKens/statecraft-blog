import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthConext";
import { createPost } from "../services/postService";
import { Filters } from "../config/filters";

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">You must be logged in to create a post</p>
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

  const categories = Filters.filter((f) => f.label !== "All");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setImage(file);
    setError("");
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createPost({
        title,
        image,
        description,
        details,
        category,
      });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-lg font-bold text-gray-800">New Post</h1>
          <div />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Image (optional)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-gray-300 rounded-xl px-3 py-8 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 cursor-pointer transition"
            >
              {preview ? "Change image" : "Click to upload an image"}
            </button>
            {preview && (
              <div className="mt-3 relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.label} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of your post"
              required
              rows={2}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Write your full post content here..."
              required
              rows={8}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-2 rounded-xl font-medium hover:bg-emerald-800 cursor-pointer transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </main>
    </div>
  );
}
