"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { Room } from "@/types/room";
import { useRef } from "react";

interface Props {
  initialRooms: Room[];
  children: React.ReactNode;
}

export default function RoomsProvider({ initialRooms, children }: Props) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useRoomStore.getState().setRooms(initialRooms);
    initialized.current = true;
  }

  return <>{children}</>;
}
