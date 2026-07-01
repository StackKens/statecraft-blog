/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { fetchPosts } from "../services/postService";
import type { Post } from "../types/post";

interface PostContextType {
  search: string;
  setSearch: (value: string) => void;
  loading: boolean;
  error: string | null;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  filteredPosts: Post[];
}
//create the post context

const PostContext = createContext<PostContextType | null>(null);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");

  const filteredPosts = posts
    .filter((post) =>
      activeFilter === "All" ? true : post.category === activeFilter,
    )
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

  //fectching data
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  //create the provider
  return (
    <PostContext.Provider
      value={{
        setActiveFilter,
        loading,
        activeFilter,
        error,
        filteredPosts,
        search,
        setSearch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

//create custom hook

export function usePosts() {
  const postContext = useContext(PostContext);

  if (!postContext) {
    throw new Error("Post context Must not be used outside the provider");
  }

  return postContext;
}
