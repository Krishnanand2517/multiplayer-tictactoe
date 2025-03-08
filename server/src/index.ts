import { Server } from "socket.io";

interface RoomJoinData {
  username: string;
  roomId: string;
}

const io = new Server(parseInt(process.env.PORT!) || 8000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("room:join", async (data: RoomJoinData) => {
    const { username, roomId } = data;

    io.to(roomId).emit("user:joined", { username, socketId: socket.id });

    await socket.join(roomId);
    console.log(`${username} joined the room - ${roomId}`);

    io.to(socket.id).emit("room:join", { roomId });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});
