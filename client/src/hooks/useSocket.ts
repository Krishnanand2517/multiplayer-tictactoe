import { useContext } from "react";
import SocketContext from "../context/ContextProvider";

export const useSocket = () => {
  return useContext(SocketContext);
};
