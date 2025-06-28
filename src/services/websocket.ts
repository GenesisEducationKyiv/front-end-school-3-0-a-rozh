import { io, Socket } from 'socket.io-client';

export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

class WebSocketService {
    private socket: Socket | null = null;
    private readonly serverUrl: string;

    constructor(serverUrl: string = WEBSOCKET_URL) {
        this.serverUrl = serverUrl;
    }

    connect() {
        if (this.socket?.connected) {
            return;
        }

        this.socket = io(this.serverUrl);

        this.socket.on('connect', () => {
            this.sendRadioGetStatus();
        });

        this.socket.on('disconnect', () => {});

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });
    }

    private sendRadioGetStatus() {
        if (this.socket?.connected) {
            this.socket.emit('radio:getStatus');
        } else {
            console.warn('Cannot send radio:getStatus - socket not connected');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    isConnected() {
        return this.socket?.connected ?? false;
    }

    onRadioStatus(callback: (status: boolean) => void) {
        this.socket?.on('radio:status', callback);
    }

    onRadioTrack(callback: (track: string) => void) {
        this.socket?.on('radio:track', callback);
    }

    sendRadioStart() {
        this.socket?.emit('radio:start');
    }

    sendRadioStop() {
        this.socket?.emit('radio:stop');
    }
}

export const webSocketService = new WebSocketService();
