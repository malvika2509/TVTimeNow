import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gemAPI_Key } from "../utils/constants";
import Header from "./Header";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(gemAPI_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SuggestedShowsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the TVMaze API
  const fetchShowsFromApi = async () => {
    const apiUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };

  const onHandleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Step 1: Get TV show names from Gemini AI (Optional)
        const prompt = `Suggest 10 TV show names based on the category Talk Show, Scripted, Variety, Reality, Game Show, Sports, Animation, Documentary, Panel Show, Award Show do not put any extra text just the tv show names: ${query}.`;
        const result = await model.generateContent(prompt);
        const resultText = result.response.text();
        const showNames = resultText
          .split("\n")
          .filter((line) => line.trim() !== "");

        // Step 2: Fetch show data from TVMaze API
        const tvShowsData = await fetchShowsFromApi();

        // Step 3: Map over the API data and include show names
        const finalResults = tvShowsData.map((show) => ({
          name: show.show.name,
          image: show.show.image?.medium, // TVMaze provides different image sizes (medium, original, etc.)
          url: show.show.url,
        }));

        setResults(finalResults);
      } catch (error) {
        console.error("Error fetching AI results or TVMaze data:", error);
      }
      setLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header />
      <button
        className="p-2 text-violet-500 hover:text-white"
        onClick={onHandleClick}
      >
        Back
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Suggested TV Shows for: {query}
      </h2>

      {loading ? (
        <p className="text-gray-400 mt-2 text-center">Fetching results...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.length > 0 ? (
            results.map((show, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${show.image})`,
                }}
              >
                <h3 className="text-lg font-semibold">{show.name}</h3>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestedShowsPage;
