import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChannelDetails from "./components/ChannelDetails";
import Home from "../src/components/Home";
import SuggestedShowsPage from "./components/SuggestedShowsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel/:channelName" element={<ChannelDetails />} />
        <Route path="/suggested-shows" element={<SuggestedShowsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
