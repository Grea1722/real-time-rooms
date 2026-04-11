"use client";
import { useUserStore } from "@/store/useUserStore";
import UserMenu from "./profile/UserMenu";


const Navbar = () => {
  const { full_name } = useUserStore(state => state.profile);

  const cleanName = full_name ? full_name.charAt(0).toUpperCase() + full_name.slice(1) 
  : "Guest"

  const initials = full_name ? full_name.substring(0,2).toUpperCase() : "GU";

  return (
    <div className='flex items-center justify-between p-4 bg-primary text-white'>
        <div className="w-2/5">
        <input 
          type="text" 
          placeholder='Buscar habitación, huésped o estado...' 
          className='w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-secondary border border-transparent transition-all' 
        />
      </div>
       <div className="flex items-center gap-4">
        <span className="text-sm font-medium hidden md:inline-block">
          {cleanName}
        </span>
        <UserMenu initials={initials} />
      </div>
        
    </div>
  )
}

export default Navbar