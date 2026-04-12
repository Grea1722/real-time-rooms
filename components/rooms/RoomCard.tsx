
import { useRoomStore } from "@/store/useRoomStore";
import { Room } from "../../types/room";
interface RoomCardProps {
  room: Room;
}

const statusStyles = {
  available: {
    card: "bg-green-50 border-green-200",
    badge: "bg-green-500 text-white",
    dot: "bg-[#064E3B]",
  },
  occupied: {
    card: "bg-red-50 border-red-200",
    dot: "bg-[#7F1D1D]",
  },
  cleaning: {
    card: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-400 text-yellow-900",
    dot: "bg-yellow-600",
  },
  maintenance: {
    card: "bg-slate-100 border-slate-300",
    badge: "bg-slate-500 text-white",
    dot: "bg-slate-700",
  },
};

export default function RoomCard({ room }: RoomCardProps) {
  const style = statusStyles[room.status];
  const updateRoomStatus= useRoomStore((state) => state.updateRoomStatus); 


  const handleStatusChange = () => {
    const statuses: Room["status"][]= ["available", "occupied", "cleaning", "maintenance"];
    const currentIndex = statuses.indexOf(room.status);
    const newIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[newIndex];

    updateRoomStatus(room.id, newStatus);
  }

  return (
    <div
    onClick={handleStatusChange}
      key={room.id}
      className={`relative overflow-hidden p-5 border rounded-2xl m-4 max-w-sm transition-all hover:shadow-md cursor-pointer border-slate-200 shadow-sm`}
    >
      <div className={`absolute top-0 inset-x-0 h-[6px] ${style.dot}`}></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Room
          </span>
          <h3 className="font-black text-2xl text-slate-800">
            {room.room_number}
          </h3>
          <p className="text-sm text-slate-500 font-medium italic">
            {room.type}
          </p>
        </div>

        {/* El Badge que ahora sí toma el color del objeto */}
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm ${style.dot} text-white`}
          >
            {room.status}
          </span>
          {/* Un puntito decorativo solo para lucir el TS */}
          <div className={`w-2 h-2 rounded-full animate-pulse ${style.dot}`} />
        </div>
      </div>
    </div>
  );
}
