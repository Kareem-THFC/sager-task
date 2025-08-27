import { create } from "zustand";
import type { DroneStore, DroneFeature } from "../types/drone";
import { processIncomingDrone } from "../utils/droneUtils";

export const useDroneStore = create<DroneStore>((set, get) => ({
  drones: {},
  isConnected: false,
  connectionError: null,
  totalDrones: 0,
  authorizedDrones: 0,
  unauthorizedDrones: 0,

  updateDrone: (droneData: DroneFeature) => {
    const { registration } = droneData.properties;
    const existingDrone = get().drones[registration];

    const updatedDrone = processIncomingDrone(droneData, existingDrone);

    set((state) => {
      //   const newDrones = {
      //     ...state.drones,
      //     [registration]: updatedDrone,
      //   };

      //   // Calculate stats
      //   const totalDrones = Object.keys(newDrones).length;
      //   const authorizedDrones = Object.values(newDrones).filter(
      //     (d) => d.isAuthorized
      //   ).length;
      //   const unauthorizedDrones = totalDrones - authorizedDrones;

      //   return {
      //     drones: newDrones,
      //     totalDrones,
      //     authorizedDrones,
      //     unauthorizedDrones,
      //   };
      // });

      // console.log(`Updated drone ${registration}:`, updatedDrone);

      const isNew = !state.drones[registration];
      const wasAuthorized = existingDrone?.isAuthorized;
      const isAuthorized = updatedDrone.isAuthorized;

      // incrementally update stats instead of recalculating all
      let authorizedDrones = state.authorizedDrones;
      let unauthorizedDrones = state.unauthorizedDrones;
      let totalDrones = state.totalDrones;

      if (isNew) {
        totalDrones++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isAuthorized ? authorizedDrones++ : unauthorizedDrones++;
      } else if (wasAuthorized !== isAuthorized) {
        if (wasAuthorized) {
          authorizedDrones--;
          unauthorizedDrones++;
        } else {
          unauthorizedDrones--;
          authorizedDrones++;
        }
      }

      return {
        drones: {
          ...state.drones,
          [registration]: updatedDrone,
        },
        totalDrones,
        authorizedDrones,
        unauthorizedDrones,
      };
    });
  },

  removeDrone: (registration: string) => {
    set((state) => {
      const newDrones = { ...state.drones };
      delete newDrones[registration];

      const totalDrones = Object.keys(newDrones).length;
      const authorizedDrones = Object.values(newDrones).filter(
        (d) => d.isAuthorized
      ).length;
      const unauthorizedDrones = totalDrones - authorizedDrones;

      return {
        drones: newDrones,
        totalDrones,
        authorizedDrones,
        unauthorizedDrones,
      };
    });
  },

  setConnectionStatus: (connected: boolean, error?: string) => {
    set({
      isConnected: connected,
      connectionError: error || null,
    });
  },

  clearAllDrones: () => {
    set({
      drones: {},
      totalDrones: 0,
      authorizedDrones: 0,
      unauthorizedDrones: 0,
    });
  },

  getDroneById: (registration: string) => {
    return get().drones[registration];
  },

  getActiveDrones: () => {
    return Object.values(get().drones).filter((drone) => drone.isActive);
  },

  getUnauthorizedDrones: () => {
    return Object.values(get().drones).filter((drone) => !drone.isAuthorized);
  },

  getAltitudeAvarage: () => {
    const dronesArray = Object.values(get().drones);
    // getAltitude avarage for all drones
    return (
      dronesArray.reduce((sum, drone) => sum + drone.properties.altitude, 0) /
      dronesArray.length
    );
  },
}));
