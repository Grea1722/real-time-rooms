"use client";

import { useUserStore } from "@/store/useUserStore";


const Navbar = () => {
  const { full_name } = useUserStore(state => state.profile);

  const cleanName = full_name ? full_name.charAt(0).toUpperCase() + full_name.slice(1) : "Guest"


  return (
    <div className='flex items-center justify-between p-4 bg-primary text-white'>
        <input type="text" placeholder='Buscar habitacion, huesped o estado' className='px-4 py-2 rounded-md bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-secondary' />
        <h2>{cleanName}</h2>
    </div>
  )
}

export default Navbar