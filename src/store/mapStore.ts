import { create } from "zustand";
import type { MapStore, MapViewState } from "../types/map";
import { MAP_CONFIG } from "../utils/constants";

export const useMapStore = create<MapStore>((set) => ({
  viewState: MAP_CONFIG.INITIAL_VIEW_STATE,
  selectedDroneId: null,
  isLoading: false,
  followDrone: false,

  stopFollowing: () => set({ followDrone: false }),

  setViewState: (newViewState: Partial<MapViewState>) => {
    set((state) => ({
      viewState: { ...state.viewState, ...newViewState },
    }));
  },

  setSelectedDrone: (droneId: string | null) => {
    set({ selectedDroneId: droneId });
  },

  centerOnDrone: (longitude: number, latitude: number) => {
    set((state) => ({
      viewState: {
        ...state.viewState,
        longitude,
        latitude,
        zoom: Math.max(state.viewState.zoom, 15),
      },
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
