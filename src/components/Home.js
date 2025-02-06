import React, { useEffect, useState } from "react";
import ChannelsList from "./ChannelsList";
import Header from "./Header";
import { TVMAzeAPI } from "../utils/constants";
import VideoBackground from "./VideoBackground";

const Home = () => {
  const [allChannels, setAllChannels] = useState([]); // Stores unique TV channels
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages (if any)

  // Function to fetch channels from the API
  const fetchChannels = () => {
    setLoading(true);
    setError(null); // Reset previous errors before fetching

    fetch(TVMAzeAPI)
      .then((response) => {
        if (!response.ok)
          throw new Error("Failed to fetch data. Please try again.");
        return response.json();
      })
      .then((data) => {
        // Extract unique US-based TV channel names
        const uniqueChannels = [
          ...new Set(
            data
              .filter(
                (item) => item._embedded?.show?.network?.country?.code === "US"
              ) // Ensure only US networks
              .map((item) => item._embedded?.show?.network?.name) // Extract channel names
              .filter(Boolean) // Remove empty values
          ),
        ];

        setAllChannels(uniqueChannels);
        setError(null); // Clear error state on success
      })
      .catch((err) => {
        console.error("Error fetching channels:", err); // Log error for debugging
        setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false)); // Mark loading as complete
  };

  // Fetch channels when component mounts
  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header /> {/* Display navigation header */}
      {loading ? (
        <div className="text-center text-gray-400">Loading channels...</div>
      ) : error ? (
        // Error Message with Retry Button
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchChannels}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Hero Section with Title & Video Background */}
          <div className="flex flex-col md:flex-row justify-between items-center m-12 md:m-24">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl md:text-5xl font-extrabold tracking-wide uppercase">
                Welcome to <br />
                TVTimesNow
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mt-2">
                Your guide to what's on TV right now in the US.
              </p>
            </div>
            <VideoBackground /> {/* Background video animation */}
          </div>

          {/* Display list of TV channels */}
          <ChannelsList allChannels={allChannels} />
        </>
      )}
    </div>
  );
};

export default Home;
