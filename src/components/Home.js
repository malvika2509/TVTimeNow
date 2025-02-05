import React from "react";
import ChannelsList from "./ChannelsList";
import Header from "./Header";

const Home = () => {
  return (
    <div className=" min-h-screen bg-black text-white p-6">
      <Header></Header>

      <div className="">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide uppercase">
          Welcome to <br />
          TVTimesNow
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mt-2 mb-8">
          Your guide to what's on TV right now in the US.
        </p>
      </div>
      <div className="">
        <ChannelsList></ChannelsList>
      </div>
    </div>
  );
};

export default Home;
