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
          <div className="flex justify-between items-center p-7">
            <span>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Hotel Monitor{" "}
                <span className="text-blue-600 text-2xl">v1.0</span>
              </h1>
              <p className="text-slate-500">Panel de control en tiempo real</p>
            </span>
            <span className="flex flex-row gap-2 items-center text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              <p>Live Connection Active</p>
            </span>
          </div>
        </header>

        <RoomsProvider initialRooms={rooms || []}>
          <div className="px-10">
            <RoomOverview />
            <RealTimeRooms initialRooms={rooms || []} />
          </div>
        </RoomsProvider>
      </main>
    </div>
  );
}
