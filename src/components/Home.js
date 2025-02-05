import React from "react";
import { Search } from "lucide-react";
import ChannelsList from "./ChannelsList";

const Home = () => {
  return (
    <div className=" min-h-screen bg-black text-white p-6">
      <header className="flex justify-between w-full  mb-8">
        <div>
          <h1 className="text-4xl font-extrabold">TVTimesNow</h1>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Search className="text-white" />
          <input
            type="text"
            placeholder="Search shows..."
            className="bg-gray-800 text-red p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </header>

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
