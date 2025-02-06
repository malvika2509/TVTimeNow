import React from "react";
import GPTSearchBar from "./GPTSearchBar"; // ✅ Import GPT Search
import { useNavigate } from "react-router-dom";

const Header = ({ types }) => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate("/");
  };

  return (
    <header className="flex justify-between w-full mb-8">
      <h1
        className="text-4xl font-extrabold cursor-pointer"
        onClick={onHandleClick}
      >
        TVTimesNow
      </h1>

      {/* ✅ GPT Search Bar with Debounce */}
      <GPTSearchBar types={types} />
    </header>
  );
};

export default Header;
