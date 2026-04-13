"use client";
import React from "react";
import RoomStatCard from "./RoomStatCard";
import { useRoomStore } from "@/store/useRoomStore";

const RoomOverview = () => {
  const rooms = useRoomStore((state) => state.rooms);

  const stats = {
    available: rooms.filter((room) => room.status === "available").length,
    occupied: rooms.filter((room) => room.status === "occupied").length,
    cleaning: rooms.filter((room) => room.status === "cleaning").length,
    maintenance: rooms.filter((room) => room.status === "maintenance").length,
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <RoomStatCard
        label="Available"
        value={stats.available}
        status="available"
      />
      <RoomStatCard label="Occupied" value={stats.occupied} status="occupied" />
      <RoomStatCard label="Cleaning" value={stats.cleaning} status="cleaning" />
      {/* Ejemplo de la imagen */}
      <RoomStatCard
        label="Maintenance"
        value={stats.maintenance}
        status="maintenance"
      />
    </section>
  );
};

export default RoomOverview;
