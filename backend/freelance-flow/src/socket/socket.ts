import { Server, Socket } from 'socket.io';

export default function registerSocketHandlers(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('joinCompany', (companyId: string) => {
            socket.join(`company-${companyId}`);
            console.log(`Socket ${socket.id} joined company-${companyId}`);
        });

        socket.on('leaveCompany', (companyId: string) => {
            socket.leave(`company-${companyId}`);
            console.log(`Socket ${socket.id} left company-${companyId}`);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
