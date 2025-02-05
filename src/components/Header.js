import React from "react";
import { Search } from "lucide-react";

function Header() {
  return (
    <div>
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
    </div>
  );
}

export default Header;
