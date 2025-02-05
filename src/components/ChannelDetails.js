import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const TVMAZE_API_URL = "https://api.tvmaze.com/schedule/full";

const ChannelDetails = () => {
  const { channelName } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState({});
  const [selectedShow, setSelectedShow] = useState(null); // Store selected show for modal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(TVMAZE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const filteredShows = data.filter(
          (item) => item._embedded?.show?.network?.name === channelName
        );

        const groupedShows = {};

        filteredShows.forEach((item) => {
          const showId = item._embedded?.show?.id;
          const showName = item._embedded?.show?.name;

          if (!groupedShows[showId]) {
            groupedShows[showId] = {
              id: showId,
              name: showName,
              image:
                item._embedded?.show?.image?.original ||
                "https://via.placeholder.com/150",
              episodes: [],
            };
          }

          groupedShows[showId].episodes.push({
            episodeName: item.name || `Episode ${item.number}`,
            airdate: item.airdate,
            airtime: item.airtime,
            summary: item.summary || "No description available.",
          });
        });

        setShows(groupedShows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [channelName]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header></Header>
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 underline cursor-pointer"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">{channelName}</h1>

        {Object.keys(shows).length === 0 ? (
          <p className="text-gray-500 text-center">
            No shows available for this channel.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(shows).map((show) => (
              <div
                key={show.id}
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg "
                onClick={() => setSelectedShow(show)}
              >
                {/* Background Image */}
                <div
                  className="h-72 bg-cover bg-center "
                  style={{ backgroundImage: `url(${show.image})` }}
                ></div>

                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 bg-gradient-to-b from-black">
                  <h2 className="text-xl font-bold">{show.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Show Details */}
        {selectedShow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-black border-2 border-violet-500 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                onClick={() => setSelectedShow(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-4">{selectedShow.name}</h2>

              <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
                {selectedShow.episodes.map((episode, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="text-lg font-semibold">
                      {episode.episodeName}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Airs on:</strong> {episode.airdate} at{" "}
                      {episode.airtime}
                    </p>
                    <p
                      className="text-gray-800 mt-2"
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
