"use client";

import { supabase } from "@/lib/supabase";
import { Room } from "@/types/room";
import React, { useEffect, useState } from "react";
import RoomCard from "./rooms/RoomCard";

const RealTimeRooms = ({ initialRooms }: { initialRooms: Room[] }) => {
  const [rooms, setRooms] = useState(initialRooms);

  useEffect(() => {
    //Suscripcion al canal de Realtime
    const channel = supabase
      .channel("room-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        (payload) => {
          console.log("Cambio detectado!", payload);
          fetchFreshData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFreshData = async () => {
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .order("room_number");

    if (data) setRooms(data as Room[]);
  };

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    {rooms.map((room) => (
      <RoomCard key={room.id} room={room} />
    ))}
  </div>)
};

export default RealTimeRooms;
