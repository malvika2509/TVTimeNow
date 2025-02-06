import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GPTSearchBar = ({ types }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  // Debouncing logic to reduce unnecessary navigations
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query.trim()); // Trim to remove unwanted spaces
    }, 500); // Adjusted debounce to 500ms for better UX

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      navigate(`/suggested-shows?query=${encodeURIComponent(debouncedQuery)}`);
    }
  }, [debouncedQuery, navigate]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
        <Search className="text-white" />
        <input
          type="text"
          placeholder="Search shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-white p-2 outline-none w-full"
        />
      </div>
    </div>
  );
};

export default GPTSearchBar;
