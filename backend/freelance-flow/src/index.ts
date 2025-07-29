import { AppDataSource } from "./config/data-source";
import app from "./app";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import dotenv from 'dotenv'
import registerSocketHandlers from "./socket/socket";
import { emitCompanyNotification, NotificationPayload } from "./services/notification.services";

dotenv.config()

const server = http.createServer(app);

export const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 5000



AppDataSource.initialize()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        })

        registerSocketHandlers(io);


    })
    .catch((err) => {
        console.log(`DB Connection error: ${err}`);

    })