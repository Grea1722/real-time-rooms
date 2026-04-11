// constants/rooms.ts
export const ROOM_STATUS_CONFIG = {
  available: {
    label: "Libre",
    color: "emerald",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    accent: "#064E3B", // Tu verde pro
    icon: "✓",
  },
  occupied: {
    label: "Ocupada",
    color: "red",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    accent: "#7F1D1D", // Tu rojo quemado
    icon: "⌂",
  },
    cleaning: {
    label: "Limpieza",
    color: "yellow",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
    accent: "#D97706", // Tu amarillo mostaza
    icon: "🧹",},
    maintenance:{
    label: "Mantenimiento",
    color: "slate",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
    accent: "#475569", // Tu gris azulado
    icon: "🛠️",
    }

} as const;

export type RoomStatus = keyof typeof ROOM_STATUS_CONFIG;