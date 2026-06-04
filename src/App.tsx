import { useEffect, useState } from "react";

import Header from "./components/ui/Header";
import Hero from "./components/ui/Hero";
import FilterBar from "./components/ui/FilterBar";

interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
}
export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  //defining states
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //fetching data in the useEffect hook

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("src/data/data.json");
        if (!response.ok) {
          throw new Error(`http error  ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  return (
    <div>
      <Header />
      <Hero />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <section>
        <div>
          {loading && <p>Loading...</p>}
          {error && (
            <p className="text-red-300 font-semibold text-xl text-center">
              Oops!, an error occured, please try again later
            </p>
          )}

          {/* displaying data in the ui */}

          {posts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.title}>
                  <img src={`${post.image}`} alt="Post title" />
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
