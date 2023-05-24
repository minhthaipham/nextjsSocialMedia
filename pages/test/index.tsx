import { useSocket } from "@/context/SocketContext";
import React from "react";

const Test = () => {
  const { socket } = useSocket();
  React.useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    }
  }, [socket]);
  return <div>Test</div>;
};

export default Test;
