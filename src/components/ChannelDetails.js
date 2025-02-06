import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { TVMAzeAPI } from "../utils/constants";
import { X } from "lucide-react";

const ChannelDetails = () => {
  const { channelName } = useParams(); // Get channel name from URL
  const navigate = useNavigate();

  const [shows, setShows] = useState({}); // Store grouped shows
  const [selectedShow, setSelectedShow] = useState(null); // Selected show for modal
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
        // Filter for shows that belong to the selected channel
        const filteredShows = data.filter(
          (item) => item._embedded?.show?.network?.name === channelName
        );

        // Group shows by their ID
        const groupedShows = {};
        filteredShows.forEach((item) => {
          const showId = item._embedded?.show?.id;
          const showName = item._embedded?.show?.name;

          if (!groupedShows[showId]) {
            groupedShows[showId] = {
              id: showId,
              name: showName,
              // Assign image or fallback gradient
              image: item._embedded?.show?.image?.original
                ? `url(${item._embedded.show.image.original})`
                : `linear-gradient(135deg, hsl(${
                    Math.random() * 360
                  }, 80%, 50%), hsl(${Math.random() * 360}, 80%, 60%))`,
              episodes: [],
            };
          }

          // Add valid episode information
          if (item.name || item.number) {
            groupedShows[showId].episodes.push({
              episodeName: item.name || `Episode ${item.number}`,
              airdate: item.airdate || "Unknown Date",
              airtime: item.airtime || "Unknown Time",
              summary: item.summary || "No description available.",
            });
          }
        });

        setShows(groupedShows);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [channelName]); // Runs when channelName changes

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-400">
        Loading channel details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 underline cursor-pointer"
        >
          ← Back
        </button>

        {/* Channel Name */}
        <h1 className="text-3xl font-bold mb-6 text-center">{channelName}</h1>

        {/* Show Grid or No Shows Message */}
        {Object.keys(shows).length === 0 ? (
          <p className="text-gray-500 text-center">
            No shows available for this channel.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(shows).map((show) => (
              <div
                key={show.id}
                className="relative cursor-pointer rounded-lg shadow-lg overflow-hidden"
                onClick={() => setSelectedShow(show)}
              >
                {/* Background Image or Gradient */}
                <div
                  className="h-72 bg-cover bg-center"
                  style={{ backgroundImage: show.image }}
                ></div>

                {/* Show Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                  <h2 className="text-xl font-bold">{show.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show Details Modal */}
        {selectedShow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-black border-2 border-violet-500 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedShow(null)}
                className="absolute top-2 right-2  text-white px-3 py-1 hover:text-violet-500"
              >
                <X />
              </button>

              {/* Show Name */}
              <h2 className="text-2xl font-bold mb-4">{selectedShow.name}</h2>

              {/* Episode List */}
              <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
                {selectedShow.episodes.map((episode, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="text-lg font-semibold">
                      {episode.episodeName}
                    </h3>
                    <p className="text-white">
                      <strong>Airs on:</strong> {episode.airdate} at{" "}
                      {episode.airtime}
                    </p>
                    <p
                      className="text-gray-500 mt-2"
                      dangerouslySetInnerHTML={{ __html: episode.summary }}
                    ></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelDetails;
