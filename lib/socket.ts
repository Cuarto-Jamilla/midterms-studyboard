import type { Server as IOServer } from "socket.io";

export function getIO(): IOServer | undefined {
    return (globalThis as unknown as { io?: IOServer }).io;
}

export function emitGroup(
    groupId: string,
    event: string,
    payload: string,
    excludeSocketId?: string | null,
): void {
    const io = getIO();
    if (!io) return;

    const room = `group-${groupId}`;
    const targetSockets = excludeSocketId ? io.to(room).except(excludeSocketId) : io.to(room);
    targetSockets.emit(event,payload);


}