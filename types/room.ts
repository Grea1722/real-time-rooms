export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';

export interface Room {
    id: string; //UUID
    room_number: string; //101-A
    type:string; //Delux, Doble, Simple
    status: RoomStatus; //Arriba estan xd
    price: number;
    last_cleaned?: string; // El ? es que puede ser null o undefined.
}