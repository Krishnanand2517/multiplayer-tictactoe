import { createContext, ReactNode, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  connect: () => Socket;
  disconnect: () => void;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connect: () => {
    throw new Error("SocketProvider not found");
  },
  disconnect: () => {
    throw new Error("SocketProvider not found");
  },
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (socket) return socket;

    const newSocket = io("http://localhost:8000");

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(newSocket);
    return newSocket;
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, connect, disconnect, isConnected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
