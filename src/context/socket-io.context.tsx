import { useLocalStorage } from "@/composables/useLocalStorage";
import { ACCESS_TOKEN } from "@/constants";
import { createContext, ReactNode, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface SocketIOContextType {
  socket: Socket;
  setSocket: Function;
}
interface SocketIOContextProps {
  children: ReactNode;
}

const SocketIOContext = createContext<SocketIOContextType | null>(null);

export const SocketIOContextProvider = ({ children }: SocketIOContextProps) => {
  const tokenStorage = useLocalStorage(ACCESS_TOKEN);
  const [socket, setSocket] = useState<Socket>(io());
  socket.auth = { token: tokenStorage.getItem() };
  socket.connect();
  const value = { socket, setSocket };
  return (
    <SocketIOContext.Provider value={value}>
      {children}
    </SocketIOContext.Provider>
  );
};
export default function useSocketIOContext() {
  return useContext(SocketIOContext) as SocketIOContextType;
}
