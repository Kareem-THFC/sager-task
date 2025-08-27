export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface MapStore {
  viewState: MapViewState;
  selectedDroneId: string | null;
  isLoading: boolean;
  followDrone: boolean;
  setViewState: (viewState: Partial<MapViewState>) => void;
  setSelectedDrone: (droneId: string | null) => void;
  centerOnDrone: (longitude: number, latitude: number) => void;
  setLoading: (loading: boolean) => void;
  stopFollowing: () => void;
}
