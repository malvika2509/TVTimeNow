import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChannelsList = ({ allChannels }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const channelsPerPage = 10;

  // Calculate total pages (avoid division by zero)
  const totalPages =
    allChannels.length > 0
      ? Math.ceil(allChannels.length / channelsPerPage)
      : 1;

  // Get the slice of channels to display on the current page
  const startIndex = (page - 1) * channelsPerPage;
  const visibleChannels = allChannels.slice(
    startIndex,
    startIndex + channelsPerPage
  );

  // Function to generate dynamic gradient colors
  const generateGradient = (index) => {
    const hue = (index * 45) % 360; // Ensures a variety of colors
    return `linear-gradient(135deg, hsl(${hue}, 80%, 50%), hsl(${
      hue + 40
    }, 80%, 60%))`;
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold uppercase mb-4">TV Channels</h2>

      {/* Show message if no channels are available */}
      {allChannels.length === 0 ? (
        <p className="text-gray-500">No channels available.</p>
      ) : (
        <>
          {/* Channels Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleChannels.map((channel, index) => (
              <div
                key={index}
                onClick={() => navigate(`/channel/${channel}`)}
                className="p-6 text-white font-bold text-lg rounded-xl shadow-lg flex justify-center items-center cursor-pointer hover:scale-105"
                style={{ background: generateGradient(index) }}
              >
                {channel}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                page === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Previous
            </button>

            <span className="text-white text-lg font-bold">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                page === totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelsList;
