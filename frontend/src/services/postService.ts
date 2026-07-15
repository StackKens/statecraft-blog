import type { Post } from "../types/post";
import { apiFetch } from "./api";

export async function fetchPosts(): Promise<Post[]> {
  const res = await apiFetch("/posts");
  return res.json();
}

export async function createPost(post: {
  title: string;
  image?: File | null;
  description: string;
  details: string;
  category: string;
}): Promise<Post> {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("description", post.description);
  formData.append("details", post.details);
  formData.append("category", post.category);
  if (post.image) {
    formData.append("image", post.image);
  }

  const res = await apiFetch("/posts", {
    method: "POST",
    body: formData,
  });
  return res.json();
}
