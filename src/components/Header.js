import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import { useNavigate } from "react-router-dom";

const Header = ({ types }) => {
  const navigate = useNavigate();

  // Navigate to the home page when the logo is clicked
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="flex justify-between w-full mb-8">
      {/* Logo with Clickable Navigation to Home */}
      <h1
        className="text-4xl font-extrabold text-white cursor-pointer transition hover:text-violet-400"
        onClick={handleLogoClick}
      >
        TVTimesNow
      </h1>

      {/* GPT-Powered Search Bar for AI-based suggestions */}
      <GPTSearchBar types={types} />
    </header>
  );
};

export default Header;
