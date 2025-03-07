require('dotenv').config();
import express from "express"
import http from "http"
import { Server } from "socket.io"
import { setupServer } from "./config/server"
import sequelize from "./models";

import authRoutes from './routes/authRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

setupServer(app);

app.use('/api/users', authRoutes); // This will prefix all user routes with /api/users


io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to PostgreSQL successful!");
  })
  .catch((err: any) => {
    console.log('Unable to connect to PostgreSQL: ', err);
  });

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})