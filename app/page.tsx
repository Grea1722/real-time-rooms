import Navbar from "@/components/Navbar";
import RealTimeRooms from "@/components/RealTimeRooms";
import RoomCard from "@/components/rooms/RoomCard";
import RoomOverview from "@/components/rooms/RoomOverview";
import { supabase } from "@/lib/supabase";
import RoomsProvider from "@/providers/RoomsProvider";
import { useUserStore } from "@/store/useUserStore";
import { Room } from "@/types/room";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  //const rooms
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .order("room_number", { ascending: true });

  if (error) {
    return (
      <div className="p-10 text-red-500 font-bold">
        Error de conexion: {error.message}
      </div>
    );
  }

  return (
    <div>
      <main>
        <header className="mb-10">
          <Navbar />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Hotel Monitor <span className="text-blue-600 text-2xl">v1.0</span>
          </h1>
          <p className="text-slate-500">Panel de control en tiempo real</p>
        </header>
        <RoomsProvider initialRooms={rooms || []}>
          <RoomOverview />
          <RealTimeRooms initialRooms={rooms || []} />
        </RoomsProvider>
      </main>
    </div>
  );
}
