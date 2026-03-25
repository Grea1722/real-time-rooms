import { Room } from "../types/room"; 

interface RoomCardProps {
    room: Room;
}

export default function RoomCard({room}: RoomCardProps){
    return (
        <div className={`p-4 border rounded-lg ${room.status === 'available' ? 'bg-green-100' : 'bg-red-100'}`}>
      <h3 className="font-bold text-lg">Habitación {room.room_number}</h3>
      <p className="text-sm text-gray-600">{room.type}</p>
      <span className="capitalize font-medium">{room.status}</span>
    </div>
    )
}