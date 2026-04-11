export interface RoomStats {
    available: number;
    occupied: number;
    cleaning: number;
    maintenance: number;
}

interface RoomOverviewProps {
    stats: RoomStats;
    totalRooms: number;
}