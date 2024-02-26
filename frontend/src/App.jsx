
import "./App.css";
import Rootlayout from "./layouts/Rootlayout";
import { Route, Routes } from "react-router-dom";
import Employee from "./pages/Employee";
import Homepage from "./pages/Homepage";
import Station from "./pages/Station";

function App() {
  return (
    <div>
      <Rootlayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/station" element={<Station />} />
          <Route path="/emp" element={<Employee />} />
        </Routes>
      </Rootlayout>
    </div>
  );
}

export default App;
