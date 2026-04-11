import { Room } from "@/types/room";
import { create } from "zustand";

interface RoomState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
}));
