import { apiFetch } from "./api";

export interface LikeStatus {
  likeCount: number;
  dislikeCount: number;
  liked: boolean;
  disliked: boolean;
}

export async function getLikes(postId: number): Promise<LikeStatus> {
  const res = await apiFetch(`/posts/${postId}/likes`);
  return res.json();
}

export async function toggleLike(
  postId: number,
  is_like: boolean,
): Promise<LikeStatus> {
  const res = await apiFetch(`/posts/${postId}/likes`, {
    method: "POST",
    body: JSON.stringify({ is_like }),
  });
  return res.json();
}
