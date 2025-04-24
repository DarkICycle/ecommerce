import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white mt-16 py-10 px-4 border-t-4 border-blue-400 shadow-inner">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} <span className="font-bold text-blue-300">MiEcommerce</span>. Todos los derechos reservados.
        </p>
        <p className="mt-2 text-sm sm:text-base">
          Creado por <span className="font-semibold text-blue-300">Samuel Gutierrez</span> y <span className="font-semibold text-blue-300">Carlos Mendoza</span>.
        </p>
        
        <div className="flex justify-center gap-6 mt-4 text-sm sm:text-base">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition duration-200">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition duration-200">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

