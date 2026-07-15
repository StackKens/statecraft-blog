import type { Post } from "../types/post";
import { apiFetch } from "./api";

export async function fetchPosts(): Promise<Post[]> {
  const res = await apiFetch("/posts");
  return res.json();
}

export async function createPost(post: {
  title: string;
  image?: string;
  description: string;
  details: string;
  category: string;
}): Promise<Post> {
  const res = await apiFetch("/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
  return res.json();
}
