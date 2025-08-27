import React from "react";
import { useDroneStore } from "../../../store/droneStore";
import DroneMarker from "./DroneMarker";
import type { ProcessedDrone } from "../../../types/drone";

const DroneMarkers: React.FC = () => {
  const { drones } = useDroneStore();

  return (
    <>
      {Object.values(drones)
        .filter((drone: ProcessedDrone) => {
          // Ensure we have valid position data
          return (
            Array.isArray(drone.currentPosition) &&
            drone.currentPosition.length === 2 &&
            typeof drone.currentPosition[0] === "number" &&
            typeof drone.currentPosition[1] === "number" &&
            !isNaN(drone.currentPosition[0]) &&
            !isNaN(drone.currentPosition[1])
          );
        })
        .map((drone: ProcessedDrone) => (
          <DroneMarker key={drone.registration} drone={drone} />
        ))}
    </>
  );
};

export default DroneMarkers;
