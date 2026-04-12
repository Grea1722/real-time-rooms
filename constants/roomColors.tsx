// constants/rooms.ts
export const ROOM_STATUS_CONFIG = {
  available: {
    label: "Available",
    color: "emerald",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  occupied: {
    label: "Occupied",
    color: "red",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    accent: "#7F1D1D", 
  },
    cleaning: {
    label: "Cleaning",
    color: "yellow",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
    icon: "🧹",},
    maintenance:{
    label: "Maintenance",
    color: "slate",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
    }

} as const;

export type RoomStatus = keyof typeof ROOM_STATUS_CONFIG;