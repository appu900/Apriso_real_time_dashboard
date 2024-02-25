import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Rootlayout from "./layouts/Rootlayout";
import { Route, Routes } from "react-router-dom";
import Employee from "./pages/Employee";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <Rootlayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </Rootlayout>
    </div>
  );
}

export default App;
