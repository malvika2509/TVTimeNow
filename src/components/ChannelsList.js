import React from "react";
import { useNavigate } from "react-router-dom";

const ChannelsList = ({ channels }) => {
  const navigate = useNavigate();

  if (channels.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No channels available at the moment.
      </div>
    );
  }

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold uppercase">TV Channels</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {channels.map((channel, index) => (
          <div
            key={index}
            onClick={() => navigate(`/channel/${channel}`)}
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

export default ChannelsList;
