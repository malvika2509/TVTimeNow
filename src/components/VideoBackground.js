import React from "react";

const VideoBackground = () => {
  return (
    <div className="w-full md:w-1/2 h-full">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/wm142yzjTy0?autoplay=1&mute=1&loop=1&playlist=wm142yzjTy0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
