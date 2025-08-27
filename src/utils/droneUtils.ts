import type { DroneFeature, ProcessedDrone } from "../types/drone";
import { DRONE_CONFIG } from "./constants";

export const isDroneAuthorized = (registration: string): boolean => {
  const parts = registration.split("-");
  if (parts.length < 2) return false;
  return parts[1].startsWith(DRONE_CONFIG.AUTHORIZED_PREFIX);
};

export const calculateFlightTime = (startTime: number): number => {
  return Math.floor((Date.now() - startTime) / 1000);
};

export const formatFlightTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const processIncomingDrone = (
  droneFeature: DroneFeature,
  existingDrone?: ProcessedDrone
): ProcessedDrone => {
  const { properties, geometry } = droneFeature;
  const currentTime = Date.now();
  const newPosition: [number, number] = [
    geometry.coordinates[0],
    geometry.coordinates[1],
  ];

  if (existingDrone) {
    // Update existing drone
    return {
      ...existingDrone,
      properties,
      currentPosition: newPosition,
      flightPath: [...existingDrone.flightPath, newPosition],
      lastSeen: currentTime,
    };
  } else {
    // Create new drone
    return {
      registration: properties.registration,
      properties,
      currentPosition: newPosition,
      flightPath: [newPosition], // Start with current position
      lastSeen: currentTime,
      flightStartTime: currentTime,
      isAuthorized: isDroneAuthorized(properties.registration),
      isActive: true,
      flightTime: currentTime,
    };
  }
};

export const cleanupInactiveDrones = (
  drones: Record<string, ProcessedDrone>,
  timeoutMs: number = 30000
): Record<string, ProcessedDrone> => {
  const currentTime = Date.now();
  const activeDrones: Record<string, ProcessedDrone> = {};

  Object.entries(drones).forEach(([registration, drone]) => {
    if (currentTime - drone.lastSeen < timeoutMs) {
      activeDrones[registration] = drone;
    }
  });

  return activeDrones;
};
