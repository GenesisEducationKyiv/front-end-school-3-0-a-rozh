import { io, Socket } from 'socket.io-client';

class WebSocketService {
    private socket: Socket | null = null;
    private readonly serverUrl: string;

    constructor(serverUrl: string = 'http://localhost:8000') {
        this.serverUrl = serverUrl;
    }

    connect(): void {
        if (this.socket?.connected) {
            console.log('WebSocket already connected');
            return;
        }

        this.socket = io(this.serverUrl);

        this.socket.on('connect', () => {
            console.log('✅ WebSocket connected successfully!');
            console.log('Socket ID:', this.socket?.id);
            console.log('Socket connected state:', this.socket?.connected);

            // Add a small delay to ensure connection is fully established
            setTimeout(() => {
                this.sendRadioGetStatus();
            }, 100);
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        // Listen for radio:status responses
        this.socket.on('radio:status', (data) => {
            console.log('radio:status response:', data);
        });
    }

    private sendRadioGetStatus(): void {
        if (this.socket?.connected) {
            console.log('Sending radio:getStatus');
            this.socket.emit('radio:getStatus');
        } else {
            console.warn('Cannot send radio:getStatus - socket not connected');
        }
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Helper method to manually trigger radio:getStatus if needed
    getRadioStatus(): void {
        this.sendRadioGetStatus();
    }

    // Check if connected
    isConnected(): boolean {
        return this.socket?.connected ?? false;
    }
}

// Export a singleton instance
export const webSocketService = new WebSocketService();

// Export the class for testing or multiple instances if needed
export { WebSocketService };
