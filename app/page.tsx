import RealTimeRooms from "@/components/RealTimeRooms";
import RoomCard from "@/components/RoomCard";
import { supabase } from "@/lib/supabase";
import { Room } from "@/types/room";

export default async function Home() {
  //const rooms
  const {data: rooms, error} = await supabase
    .from('rooms')  
    .select('*')
    .order('room_number', {ascending: true})

    if(error){
      return (
        <div className="p-10 text-red-500 font-bold">
          Error de conexion: {error.message}
        </div>
      );
    }

  return (
    <div >
      <main >
        <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Hotel Monitor <span className="text-blue-600 text-2xl">v1.0</span>
        </h1>
        <p className="text-slate-500">Panel de control en tiempo real</p>
      </header>

      <RealTimeRooms initialRooms={rooms || []} />

      </main>
    </div>
  );
}
