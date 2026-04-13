"use client";

import { supabase } from "@/lib/supabase";
import { Room } from "@/types/room";
import React, { useEffect, useState } from "react";
import RoomCard from "./rooms/RoomCard";
import { useRoomStore } from "@/store/useRoomStore";

const RealTimeRooms = ({ initialRooms }: { initialRooms: Room[] }) => {
  const rooms = useRoomStore((state) => state.rooms);
  const setRooms = useRoomStore((state) => state.setRooms);
  const searchQuery = useRoomStore((state) => state.searchQuery);

  const filteredRooms = rooms.filter((room) => {
    const query = searchQuery.toLowerCase();

    //flter by room number, type or status
    return (
      room.room_number.toString().includes(query) ||
      room.type.toLowerCase().includes(query) ||
      room.status.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    //Suscripcion al canal de Realtime
    const channel = supabase
      .channel("room-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        (payload) => {
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
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => <RoomCard key={room.id} room={room} />)
      ) : (
        <p className="col-span-full text-center text-muted-foreground">
          No rooms found.
        </p>
      )}
    </div>
  );
};

export default RealTimeRooms;
