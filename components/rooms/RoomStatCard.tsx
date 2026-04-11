import { ROOM_STATUS_CONFIG } from "@/constants/roomColors";

interface RoomStatCardProps{
    label: string;
    value: number;
    status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
}
const RoomStatCard = ({ label, value, status }: RoomStatCardProps) => {
    const config = ROOM_STATUS_CONFIG[status];

  return (
    <div className={`p-4 rounded-xl  border ${config.border} bg-white shadow-sm flex items-center gap-4`}>
      <span className={`text-2xl font-bold ${config.text}`}>{value}</span>
      <span className={`text-lg font-semibold ${config.text}`}>{label}</span>
    </div>
  )
}

export default RoomStatCard
