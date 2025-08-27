export interface DroneProperties {
  serial: string;
  registration: string;
  Name: string;
  altitude: number;
  pilot: string;
  organization: string;
  yaw: number;
}

export interface DroneGeometry {
  coordinates: [number, number]; // lat & long.
  type: "Point";
}

export interface DroneFeature {
  type: "Feature";
  properties: DroneProperties;
  geometry: DroneGeometry;
}

export interface DroneData {
  type: "FeatureCollection";
  features: DroneFeature[];
}

export interface ProcessedDrone {
  registration: string;
  properties: DroneProperties;
  currentPosition: [number, number]; //incoming pos. from the websocket
  flightPath: [number, number][]; // prev. positsions of the drone
  lastSeen: number;
  flightTime: number;
  isAuthorized: boolean;
  flightStartTime: number;
  isActive: boolean;
}

export interface DroneStore {
  drones: Record<string, ProcessedDrone>;
  isConnected: boolean;
  connectionError: string | null;
  totalDrones: number;
  authorizedDrones: number;
  unauthorizedDrones: number;

  updateDrone: (droneData: DroneFeature) => void;
  removeDrone: (registration: string) => void;
  setConnectionStatus: (connected: boolean, error?: string) => void;
  clearAllDrones: () => void;
  getDroneById: (registration: string) => ProcessedDrone | undefined;
  getActiveDrones: () => ProcessedDrone[];
  getUnauthorizedDrones: () => ProcessedDrone[];
  getAltitudeAvarage: () => number;
}
