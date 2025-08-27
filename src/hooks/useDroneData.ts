import { useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import { useDroneStore } from "../store/droneStore";

export const useDroneData = () => {
  const { updateDrone, setConnectionStatus, clearAllDrones } = useDroneStore();

  const { isConnected, connectionError, lastMessage } = useWebSocket((data) => {
    // process each drone from the web socket message
    if (data && data.features && data.features.length > 0) {
      data.features.forEach((feature) => {
        updateDrone(feature);
      });
    }
  });

  // update connection status in drone store
  useEffect(() => {
    setConnectionStatus(isConnected, connectionError || undefined);
  }, [isConnected, connectionError, setConnectionStatus]);

  // clear drones when disconnected for too long
  useEffect(() => {
    if (!isConnected && connectionError) {
      clearAllDrones();
      console.warn("WebSocket disconnected:", connectionError);
    }
  }, [isConnected, connectionError]);

  return {
    isConnected,
    connectionError,
    lastMessage,
  };
};
