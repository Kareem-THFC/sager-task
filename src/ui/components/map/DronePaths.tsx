import { useDroneStore } from "@/store/droneStore";
import type { ProcessedDrone } from "@/types/drone";
import { Layer, Source } from "react-map-gl/mapbox";

const DronePaths = () => {
  const { drones } = useDroneStore();

  const geojson = {
    type: "FeatureCollection" as const,
    features: Object.values(drones)
      .filter(
        (drone: ProcessedDrone) =>
          drone.flightPath && drone.flightPath.length > 1
      )
      .map((drone: ProcessedDrone) => ({
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: drone.flightPath,
        },
        properties: {
          color: drone.isAuthorized ? "#34D399" : "#DC2626",
          id: drone.registration,
        },
      })),
  };

  return (
    <Source id="drone-paths-source" type="geojson" data={geojson}>
      <Layer
        id="drone-paths"
        type="line"
        paint={{
          "line-color": ["get", "color"],
          "line-width": 1,
          "line-opacity": 0.8,
        }}
      />
    </Source>
  );
};

export default DronePaths;
