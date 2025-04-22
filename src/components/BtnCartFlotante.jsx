import React from 'react'
import carritoIcono from '../assets/cart.png'
import { useNavigate } from 'react-router-dom'  // Asegúrate de tener react-router-dom instalado
import { CartStore } from '../store/cartStore'

const BtnCartFlotante = () => {
  const cart = CartStore((state) => state.cart)
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 shadow-md rounded-full p-3 flex items-center gap-2 hover:shadow-lg transition"
    >
      <img src={carritoIcono} alt="Carrito" className="w-6 h-6" />
      {cart.length > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cart.length}
        </span>
      )}
    </button>
  )
}

export default BtnCartFlotante
