/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMapStore } from "../../../store/mapStore";
import { MAP_CONFIG } from "../../../utils/constants";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { type MapRef } from "react-map-gl/mapbox";
import { useDroneData } from "../../../hooks/useDroneData";
import { useDroneStore } from "../../../store/droneStore";
import DroneMarkers from "./DroneMarkers";
import SidePanel from "../SidePanel";
import DronePaths from "./DronePaths";

function MapContainer() {
  const mapRef = useRef<MapRef>(null);
  const { viewState, setViewState, isLoading, selectedDroneId } = useMapStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { drones, unauthorizedDrones } = useDroneStore();

  const currentSelectedDronePos =
    selectedDroneId !== null && selectedDroneId !== undefined
      ? drones[selectedDroneId]?.currentPosition
      : undefined;

  console.log("Current Selected Drone Position:", currentSelectedDronePos);

  const { isConnected, connectionError } = useDroneData();

  const onMove = useCallback(
    (evt: any) => {
      setViewState(evt.viewState);
    },
    [setViewState]
  );

  const onLoad = useCallback(() => {
    console.log("Map loaded successfully");
  }, []);

  const onError = useCallback((error: any) => {
    console.error("Map error:", error);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // follow selected drone automatically
  useEffect(() => {
    if (selectedDroneId && drones[selectedDroneId]) {
      const drone = drones[selectedDroneId];
      if (mapRef.current) {
        mapRef.current.easeTo({
          center: drone.currentPosition,
          zoom: 15,
          speed: 1.2,
        });
      }
    }
  }, [selectedDroneId, currentSelectedDronePos]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">Loading map...</div>
        </div>
      )}

      {!isConnected && connectionError && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">
            Unable to connect to map: {connectionError}
          </div>
        </div>
      )}

      {/* mapbox map */}
      <Map
        ref={mapRef}
        {...viewState}
        onMove={onMove}
        onLoad={onLoad}
        onError={onError}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_CONFIG.STYLE}
        mapboxAccessToken={MAP_CONFIG.MAPBOX_TOKEN}
        attributionControl={false}
        logoPosition="bottom-left"
      >
        {sidebarOpen && <SidePanel setSidebarOpen={setSidebarOpen} />}
        <DronePaths />
        <DroneMarkers />
      </Map>

      {/* Button to toggle the drone list sidebar */}
      <div className="absolute bottom-4 right-4 z-40">
        <button
          className="bg-[#D9D9D9]  px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-gray-700 transition-colors"
          onClick={toggleSidebar}
        >
          <span className="rounded-full bg-[#1F2327] px-2 py-1 text-xs font-semibold text-white">
            {/* show number of unauthorized drones */}
            {unauthorizedDrones}
          </span>
          <span className="text-sm text-[#3C4248">Drones Flying</span>
        </button>
      </div>
    </div>
  );
}

export default MapContainer;
