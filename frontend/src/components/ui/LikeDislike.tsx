import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useAuth } from "../../context/AuthConext";
import { getLikes, toggleLike } from "../../services/likeService";
import type { LikeStatus } from "../../services/likeService";

interface LikeDislikeProps {
  postId: number;
}

export default function LikeDislike({ postId }: LikeDislikeProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<LikeStatus>({
    likeCount: 0,
    dislikeCount: 0,
    liked: false,
    disliked: false,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getLikes(postId);
        setStatus(data);
      } catch {
        // silently fail
      }
    }
    load();
  }, [postId]);

  async function handleToggle(isLike: boolean) {
    if (!user) return;

    try {
      const data = await toggleLike(postId, isLike);
      setStatus(data);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={() => handleToggle(true)}
        disabled={!user}
        className={`flex items-center gap-1.5 text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
          status.liked
            ? "text-emerald-600"
            : "text-gray-500 hover:text-emerald-600"
        }`}
      >
        <ThumbsUp size={18} fill={status.liked ? "currentColor" : "none"} />
        <span>{status.likeCount}</span>
      </button>

      <button
        onClick={() => handleToggle(false)}
        disabled={!user}
        className={`flex items-center gap-1.5 text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
          status.disliked
            ? "text-red-500"
            : "text-gray-500 hover:text-red-500"
        }`}
      >
        <ThumbsDown size={18} fill={status.disliked ? "currentColor" : "none"} />
        <span>{status.dislikeCount}</span>
      </button>
    </div>
  );
}
