import { useState } from "react";

import Header from "./components/ui/Header";
import Hero from "./components/ui/Hero";
import FilterBar from "./components/ui/FilterBar";
export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div>
      <Header />
      <Hero />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </div>
  );
}
