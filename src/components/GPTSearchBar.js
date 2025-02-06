import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GPTSearchBar = ({ types }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        navigate(`/suggested-shows?query=${encodeURIComponent(query)}`);
      }
    }, 1000); // Debounce input for 500ms

    return () => clearTimeout(debounceTimer);
  }, [query, navigate]);

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
