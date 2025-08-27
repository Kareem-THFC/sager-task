export const WEBSOCKET_URL = "http://localhost:9013";

export const MAP_CONFIG = {
  MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  INITIAL_VIEW_STATE: {
    longitude: 35.93131881204147, // initial long. from the backend code
    latitude: 31.94878648036645, // initial lat. from the backend code
    zoom: 13,
    pitch: 0,
    bearing: 0,
  },
  STYLE: "mapbox://styles/mapbox/dark-v11",
};

export const DRONE_CONFIG = {
  AUTHORIZED_PREFIX: "B",
};
