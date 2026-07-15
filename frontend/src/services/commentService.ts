import { apiFetch } from "./api";

export interface Comment {
  id: number;
  body: string;
  user_id: number;
  author: string;
  created_at: string;
}

export async function getComments(postId: number): Promise<Comment[]> {
  const res = await apiFetch(`/posts/${postId}/comments`);
  return res.json();
}

export async function createComment(postId: number, body: string): Promise<Comment> {
  const res = await apiFetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
  return res.json();
}

export async function deleteComment(commentId: number): Promise<void> {
  await apiFetch(`/posts/0/comments/${commentId}`, { method: "DELETE" });
}
