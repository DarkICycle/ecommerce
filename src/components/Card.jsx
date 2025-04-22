import iconoVer from '../assets/ojo-abierto.png' // icono de carrito que tengas
import { useState } from 'react'
import { CartStore } from '../store/cartStore'
import iconoCarrito from '../assets/cart.png'

const Card = ({ title, image, description, price, priceOriginal, category,  }) => {
  const [mostrarModal, setMostrarModal] = useState(false)
  const addToCart = CartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart({
      title,
      image,
      price,
      category,
      id: Date.now() 
    })
  }

  return (
    <>
      <div className="max-w-xs bg-[#fdfcfa] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden transition hover:shadow-md">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 flex flex-col justify-between h-56">
          <h2 className="text-lg font-semibold text-[#333] mb-1 line-clamp-1">{title}</h2>
          <p className="text-sm text-[#7c7c7c] line-clamp-1 mb-1">{description}</p>
          <p className="text-xs text-gray-500 mb-1">Categoría: {category}</p>
          <div className="mt-auto flex justify-between items-center gap-2">
            <div>
              {priceOriginal && priceOriginal > price && (
                <p className="text-xs text-gray-400 line-through">${priceOriginal.toFixed(2)}</p>
              )}
              <span className="text-[#38a169] font-bold text-base">${price}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMostrarModal(true)}
                className="transition transform hover:scale-110"
              >
                <img src={iconoVer} alt="Ver más" className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddToCart}
                className="transition transform hover:scale-110"
              >
                <img src={iconoCarrito} alt="Agregar al carrito" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#fdfcfa] shadow-lg rounded-2xl p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
              onClick={() => setMostrarModal(false)}
            >
              ✖
            </button>
            <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-bold text-[#333] mb-2">{title}</h2>
            <p className="text-sm text-[#555] mb-2"><strong>Descripción:</strong> {description}</p>
            <p className="text-sm text-[#555]"><strong>Precio:</strong> ${price}</p>
            <p className="text-sm text-[#555]"><strong>Categoría:</strong> {category}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
