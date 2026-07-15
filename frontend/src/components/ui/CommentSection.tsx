import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthConext";
import {
  getComments,
  createComment,
  deleteComment,
} from "../../services/commentService";
import type { Comment } from "../../services/commentService";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!body.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await createComment(postId, body);
      setComments((prev) => [newComment, ...prev]);
      setBody("");
    } catch {
      setError("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete comment");
    }
  }

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Comments ({comments.length})
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment..."
            rows={2}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="mt-2 bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-xl font-medium hover:bg-emerald-800 cursor-pointer transition disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}

      {!user && (
        <p className="text-gray-500 text-sm mb-4">
          Log in to leave a comment.
        </p>
      )}

      {loading && <p className="text-gray-400 text-sm">Loading comments...</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && comments.length === 0 && (
        <p className="text-gray-400 text-sm">No comments yet. Be the first!</p>
      )}

      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-xl p-3 mb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {comment.author}
            </span>
            {user && user.id === comment.user_id && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-400 hover:text-red-600 text-xs cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{comment.body}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
