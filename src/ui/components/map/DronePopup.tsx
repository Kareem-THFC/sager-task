import React from "react";
import type { ProcessedDrone } from "../../../types/drone";
import {
  formatFlightTime,
  calculateFlightTime,
} from "../../../utils/droneUtils";
import { Popup } from "react-map-gl/mapbox";

interface DronePopupProps {
  drone: ProcessedDrone;
}

const DronePopup: React.FC<DronePopupProps> = ({ drone }) => {
  const flightTime = calculateFlightTime(drone.flightStartTime);

  return (
    <Popup
      longitude={drone.currentPosition[0]}
      latitude={drone.currentPosition[1]}
      anchor="bottom"
      closeButton={false}
      closeOnClick={false}
      offset={20}
      className="drone-popup"
    >
      <div className="bg-[#111111] text-white p-3 rounded-lg shadow-lg min-w-52 flex flex-col items-center">
        {/* Header with drone name and status */}
        <div className="mb-2">
          <h3 className="font-semibold text-sm">{drone.properties.Name}</h3>
        </div>

        <div className="flex justify-around items-center text-sm gap-4">
          <div className="flex justify-between flex-col">
            <span className="text-[#CCCCCC]">Altitude:</span>
            <span>{drone.properties.altitude} m</span>
          </div>

          <div className="flex justify-between flex-col">
            <span className="text-[#CCCCCC]">Flight Time:</span>
            <span className="font-mono">{formatFlightTime(flightTime)}</span>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default DronePopup;
