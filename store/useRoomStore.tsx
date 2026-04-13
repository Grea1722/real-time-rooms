import { supabase } from "@/lib/supabase";
import { Room } from "@/types/room";
import { create } from "zustand";

interface RoomState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  searchQuery: string;
  updateRoomStatus: (
    roomId: string,
    newStatus: Room["status"],
  ) => Promise<void>;
  setSearchQuery: (searchQuery: string) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  searchQuery: "",
  setRooms: (rooms) => set({ rooms }),
  updateRoomStatus: async (roomId: string, newStatus: Room["status"]) => {
    //optimistic update
    let previousRoom: Room | undefined;
    set((state) => {
      previousRoom = state.rooms.find((room) => room.id === roomId);
      return {
        rooms: state.rooms.map((room) =>
          room.id === roomId ? { ...room, status: newStatus } : room,
        ),
      };
    });

    const { error } = await supabase
      .from("rooms")
      .update({ status: newStatus })
      .eq("id", roomId);

    if (error && previousRoom) {
      // Revert the optimistic update
      set((state) => ({
        rooms: state.rooms.map((room) =>
          room.id === roomId ? previousRoom! : room,
        ),
      }));

      console.error("Error updating room status:", error);
    }
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
