import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/layout/AppLayout";
import "./index.css";
import MapContainer from "./ui/components/map/MapContainer";
import Dashboard from "./ui/components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map/" element={<MapContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
