import React, { useEffect, useState } from "react";
import ChannelsList from "./ChannelsList";
import Header from "./Header";
import { TVMAzeAPI } from "../utils/constants";
import VideoBackground from "./VideoBackground";

const Home = () => {
  const [channels, setChannels] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(TVMAzeAPI)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        const uniqueChannels = [
          ...new Set(
            data
              .filter(
                (item) => item._embedded?.show?.network?.country?.code === "US"
              )
              .map((item) => item._embedded?.show?.network?.name)
              .filter(Boolean)
          ),
        ];

        const uniqueTypes = [
          ...new Set(
            data.map((item) => item._embedded?.show?.type).filter(Boolean)
          ),
        ];

        setChannels(uniqueChannels);
        setTypes(uniqueTypes);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header types={types} />

      {loading ? (
        <div className="text-center text-gray-400">Loading channels...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex justify-between m-24">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase">
                Welcome to <br />
                TVTimesNow
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mt-2 mb-8">
                Your guide to what's on TV right now in the US.
              </p>
            </div>
            <VideoBackground />
          </div>

          <ChannelsList channels={channels} />
        </>
      )}
    </div>
  );
};

export default Home;
