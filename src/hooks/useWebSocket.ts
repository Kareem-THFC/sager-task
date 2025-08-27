import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import type { DroneData } from "../types/drone";
import { WEBSOCKET_URL } from "../utils/constants";

interface UseWebSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  connectionError: string | null;
  lastMessage: DroneData | null;
}

export const useWebSocket = (
  onMessage?: (data: DroneData) => void
): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<DroneData | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const socketRef = useRef<Socket | null>(null);

  const clearReconnectTimer = useCallback(() => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
  }, []);

  const disconnect = useCallback(() => {
    clearReconnectTimer();
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setSocket(null);
    setIsConnected(false);
  }, [clearReconnectTimer]);

  const connect = useCallback(() => {
    // Prevent multiple connections
    if (socketRef.current && socketRef.current.connected) {
      return;
    }

    disconnect(); // Clean up any existing connection

    try {
      console.log("Attempting to connect to WebSocket at:", WEBSOCKET_URL);

      const newSocket = io(WEBSOCKET_URL, {
        transports: ["polling"],
        timeout: 10000,
        autoConnect: true,
        forceNew: true,
      });

      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        console.log("webSocket connected");
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttempts.current = 0;
        clearReconnectTimer();
      });

      newSocket.on("disconnect", (reason) => {
        console.log("webSocket disconnected:", reason);
        setIsConnected(false);

        // Only attempt to reconnect on certain disconnect reasons
        if (reason === "io server disconnect") {
          // Server disconnected us, don't reconnect automatically
          setConnectionError(`Server disconnected: ${reason}`);
        } else if (
          reason === "transport close" ||
          reason === "transport error"
        ) {
          // Network issues, attempt reconnect
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current++;
            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttempts.current),
              10000
            );

            console.log(
              `Attempting reconnect ${reconnectAttempts.current}/${maxReconnectAttempts} in ${delay}ms`
            );
            setConnectionError(
              `Reconnecting... (${reconnectAttempts.current}/${maxReconnectAttempts})`
            );

            reconnectTimer.current = setTimeout(() => {
              if (reconnectAttempts.current <= maxReconnectAttempts) {
                connect();
              }
            }, delay);
          } else {
            setConnectionError(
              `Connection failed after ${maxReconnectAttempts} attempts`
            );
          }
        } else {
          setConnectionError(`Disconnected: ${reason}`);
        }
      });

      newSocket.on("connect_error", (error) => {
        console.error("webSocket connection error:", error);
        setIsConnected(false);
        setConnectionError(`Connection failed: ${error.message}`);
      });

      newSocket.on("message", (data: DroneData) => {
        setLastMessage(data);
        onMessage?.(data);
      });

      setSocket(newSocket);
    } catch (error) {
      console.error("failed to create socket:", error);
      setConnectionError(`Failed to create connection: ${error}`);
    }
  }, [onMessage, disconnect, clearReconnectTimer]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []); // removed connect and disconnect from dependencies to prevent recreation

  return {
    socket,
    isConnected,
    connectionError,
    lastMessage,
  };
};
