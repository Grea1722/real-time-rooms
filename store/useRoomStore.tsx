import { supabase } from "@/lib/supabase";
import { Room } from "@/types/room";
import { create } from "zustand";

interface RoomState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  updateRoomStatus: (roomId: string, newStatus: Room["status"]) => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  updateRoomStatus: async (roomId: string, newStatus: Room["status"]) => {
    const {error} = await supabase
    .from("rooms")
    .update({status: newStatus})
    .eq("id", roomId);

    console.log(roomId, newStatus, "store data")
    if(error) console.error("Error updating room status:", error);
  }
}));
