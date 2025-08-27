import React, { useState } from "react";
import type { ProcessedDrone } from "../../../types/drone";
import { Marker } from "react-map-gl/mapbox";
import DroneIconSVG from "../../../assets/icons/drone.svg";
import { useMapStore } from "../../../store/mapStore";
import DronePopup from "./DronePopup";

interface DroneMarkerProps {
  drone: ProcessedDrone;
}

const DroneIcon: React.FC<{
  isAuthorized: boolean;
  yaw: number;
  isSelected?: boolean;
  size?: number;
}> = ({ isAuthorized, yaw, isSelected, size = 32 }) => {
  const baseColor = isAuthorized ? "#22c55e" : "#ef4444";
  const pulseColor = isAuthorized
    ? "rgba(34, 197, 94, 0.3)"
    : "rgba(239, 68, 68, 0.3)";

  // Calculate needle length based on circle size
  const needleLength = size * 0.75; // 75% of circle size
  const needleWidth = Math.max(2, size / 16); // Responsive width

  return (
    <div
      className="relative flex items-center justify-center transition-transform hover:scale-110"
      style={{ width: size, height: size }}
    >
      {isSelected && (
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: pulseColor,
            width: size + 8,
            height: size + 8,
            left: -4,
            top: -4,
          }}
        />
      )}

      <div className="relative flex items-center justify-center">
        {/* Direction Needle */}
        <div
          className="absolute z-5"
          style={{
            top: "50%",
            left: "50%",
            width: needleWidth,
            height: needleLength,
            background: "transparent",
            transformOrigin: "center bottom",
            transform: `translate(-50%, -100%) rotate(${yaw}deg)`,
            transition: "transform 0.3s ease",
            borderRadius: needleWidth / 2,
          }}
        >
          {/* Needle Arrow Tip */}
          <div
            style={{
              position: "absolute",
              top: -5,
              left: "50%",
              width: 0,
              height: 0,
              borderLeft: `${5}px solid transparent`,
              borderRight: `${5}px solid transparent`,
              borderBottom: `${5 * 2}px solid ${baseColor}`,
              transform: "translateX(-50%)",
            }}
          />

          {/* Needle Base Dot */}
          <div
            style={{
              position: "absolute",
              bottom: -needleWidth / 2,
              left: "50%",
              width: needleWidth,
              height: needleWidth,
              background: "#444",
              borderRadius: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Drone Circle */}
        <div
          className="relative z-10 rounded-full shadow-lg flex items-center justify-center border-2"
          style={{
            backgroundColor: baseColor,
            width: size,
            height: size,
            borderColor: isAuthorized ? "#16a34a" : "#dc2626",
          }}
        >
          <img
            src={DroneIconSVG}
            alt="Drone Icon"
            className="w-5 h-5"
            style={{
              width: size * 0.4,
              height: size * 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const DroneMarker: React.FC<DroneMarkerProps> = ({ drone }) => {
  const { selectedDroneId, setSelectedDrone, centerOnDrone } = useMapStore();
  const isSelected = selectedDroneId === drone.registration;
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDrone(drone.registration);
    centerOnDrone(drone.currentPosition[0], drone.currentPosition[1]);
  };

  return (
    <>
      <Marker
        longitude={drone.currentPosition[0]}
        latitude={drone.currentPosition[1]}
        anchor="center"
      >
        <div
          className="cursor-pointer"
          onClick={handleClick}
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <DroneIcon
            isAuthorized={drone.isAuthorized}
            yaw={drone.properties.yaw}
            isSelected={isSelected}
            size={isSelected ? 36 : 32}
          />
        </div>
      </Marker>

      {showPopup && <DronePopup drone={drone} />}
    </>
  );
};

export default DroneMarker;
