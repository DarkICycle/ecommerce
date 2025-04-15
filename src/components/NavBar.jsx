import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
        <Link to="/">MiEcommerce</Link>
      </h1>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link
            to="/"
            className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/carrito"
            className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
          >
            Carrito
          </Link>
        </li>
        <li>
          <Link
            to="/perfil"
            className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
          >
            Perfil
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
