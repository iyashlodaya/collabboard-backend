import express from "express"
import http from "http"
import { Server } from "socket.io"
import { setupServer } from "./config/server"

const app = express();
const server = http.createServer(app);
const io = new Server(server);

setupServer(app);

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})