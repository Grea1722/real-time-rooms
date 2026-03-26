
const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-primary text-white'>
        <input type="text" placeholder='Buscar habitacion, huesped o estado' className='px-4 py-2 rounded-md bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-secondary' />
    </div>
  )
}

export default Navbar