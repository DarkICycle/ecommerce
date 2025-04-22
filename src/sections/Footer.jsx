import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12 border-t border-gray-700">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} MiEcommerce. Todos los derechos reservados.</p>
        <p className="mt-2">Creado por <span className="font-semibold">Samuel Gutierrez</span> y <span className="font-semibold">Carlos Mendoza</span>.</p>
        <div className="mt-4">
          <a href="https://twitter.com" target="_blank"  className="text-blue-400 hover:text-blue-500 mx-2">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank"  className="text-blue-600 hover:text-blue-700 mx-2">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank"  className="text-pink-500 hover:text-pink-600 mx-2">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
