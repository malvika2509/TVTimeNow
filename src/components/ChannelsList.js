import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router navigation
import { TVMAzeAPI } from "../utils/constants";

const ChannelsList = () => {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetch(TVMAzeAPI)
      .then((response) => response.json())
      .then((data) => {
        // Extract unique channel names where the network country code is "US"
        const uniqueChannels = [
          ...new Set(
            data
              .filter(
                (item) => item._embedded?.show?.network?.country?.code === "US"
              )
              .map((item) => item._embedded?.show?.network?.name)
              .filter(Boolean) // Remove null values
          ),
        ];
        setChannels(uniqueChannels);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold uppercase">TV Channels</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {channels.map((channel, index) => (
          <div
            key={index}
            onClick={() => navigate(`/channel/${encodeURIComponent(channel)}`)}
            className="p-6 text-white font-bold text-lg rounded-xl shadow-lg flex justify-center items-center cursor-pointer transition-transform transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, hsl(${
                index * 45
              }, 80%, 50%), hsl(${index * 45 + 40}, 80%, 60%))`,
            }}
          >
            {channel}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsList;