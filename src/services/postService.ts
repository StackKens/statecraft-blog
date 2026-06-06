import type { Post } from "../types/post";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/posts");
  if (!res.ok) {
    throw new Error(`failed to fetch ${res.status}`);
  }

  const data: Post[] = await res.json();
  return data;
}
