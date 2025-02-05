import React, { useEffect, useState } from "react";

const ChannelsList = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/schedule/full")
      .then((response) => response.json())
      .then((data) => {
        // Extract unique channel names
        const uniqueChannels = [
          ...new Set(
            data
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
      <h2 className="text-xl fontbold  uppercase">
        Channels Currently Airing Shows
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="p-6 text-white font-bold text-lg rounded-xl shadow-lg flex justify-center items-center"
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

export default ChannelsList;
