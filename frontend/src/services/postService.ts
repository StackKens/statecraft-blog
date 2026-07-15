import type { Post } from "../types/post";
import { apiFetch } from "./api";

export async function fetchPosts(): Promise<Post[]> {
  const res = await apiFetch("/posts");
  return res.json();
}
