import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/notfound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
