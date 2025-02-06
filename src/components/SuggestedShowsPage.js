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

  const [results, setResults] = useState([]); // Store fetched show results
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  // Function to fetch data from the TVMaze API
  const fetchShowsFromApi = async () => {
    const apiUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };

  const onHandleClick = () => {
    navigate("/"); // Navigate back to the homepage
  };

  const getShowSummary = async (showName) => {
    try {
      const prompt = `Please provide a short summary (up to 4 lines) of the TV show: ${showName}.`;
      const result = await model.generateContent(prompt); // Get content from Gemini AI
      const resultText = result.response.text(); // Extract the response text from the result
      return resultText;
    } catch (error) {
      console.error("Error fetching summary from Gemini API:", error);
      return "No summary available."; // Fallback message
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        // Step 1: Fetch show data from TVMaze API
        const tvShowsData = await fetchShowsFromApi();

        // Step 2: Process and set the show results
        const finalResults = await Promise.all(
          tvShowsData.map(async (show) => {
            const summary = await getShowSummary(show.show.name); // Fetch concise summary for each show
            return {
              name: show.show.name,
              image: show.show.image?.medium, // TVMaze provides different image sizes (medium, original, etc.)
              summary: summary, // Get the concise show summary from Gemini API
              url: show.show.url,
            };
          })
        );

        setResults(finalResults); // Set the results to state
      } catch (error) {
        setError("Error fetching data from TVMaze API."); // Handle errors
        console.error("Error fetching TVMaze data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (query) {
      fetchResults(); // Fetch results when query changes
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
      ) : error ? (
        <p className="text-red-500 mt-2 text-center">{error}</p> // Display error if any
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.length > 0 ? (
            results.map((show, index) => (
              <div
                key={index}
                className="relative p-4 rounded-lg shadow-md cursor-pointer"
              >
                {/* Card */}
                <div className="w-full h-72 bg-cover bg-center rounded-lg relative ">
                  {/* Background Image or Gradient */}
                  <div
                    className="absolute inset-0 rounded-lg bg-cover "
                    style={{
                      backgroundImage: show.image
                        ? `url(${show.image})`
                        : "linear-gradient(135deg, hsl(200, 70%, 50%), hsl(250, 70%, 60%))",
                    }}
                  >
                    {/* Black Tint Overlay */}
                    <div className="absolute inset-0 bg-black opacity-40"></div>

                    {/* Show Name */}
                    <h3 className="text-xl font-bold text-white  absolute top-4 left-4 z-10">
                      {show.name}
                    </h3>
                    {/* Summary at the Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white border-t-2 border-violet-500">
                      <p className="line-clamp-4">{show.summary}</p>
                    </div>
                  </div>
                </div>
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
