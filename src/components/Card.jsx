import iconoVer from '../assets/ojo-abierto.png';
import iconoCarrito from '../assets/cart.png';
import { useState } from 'react';
import { CartStore } from '../store/cartStore';

const Card = ({ title, image, description, price, priceOriginal, category }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const addToCart = CartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      title,
      image,
      price,
      category,
      id: Date.now(),
    });
  };

  return (
    <>
      <div
        className="max-w-xs bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        onClick={() => setMostrarModal(true)}
      >
        <div className="bg-white">
          <img
            src={image}
            alt={title}
            className="h-48 w-full object-contain p-4"
          />
        </div>
        <div className="bg-[#f3f4f6] px-4 py-3 flex flex-col justify-between h-56 font-[Inter,sans-serif]">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-4 mb-1">{description}</p>
          <p className="text-xs text-gray-500 mb-1 italic">Categoría: {category}</p>
          <div className="mt-auto flex justify-between items-center gap-2">
            <div>
              {priceOriginal && priceOriginal > price && (
                <p className="text-xs text-red-400 line-through">${priceOriginal.toFixed(2)}</p>
              )}
              <span className="text-green-600 font-bold text-base">${price}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setMostrarModal(true); }}
                className="transition transform hover:scale-110"
              >
                <img src={iconoVer} alt="Ver más" className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                className="transition transform hover:scale-110"
              >
                <img src={iconoCarrito} alt="Agregar al carrito" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div
            className="bg-white shadow-xl rounded-2xl p-6 w-[90%] max-w-md relative font-[Inter,sans-serif] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
              onClick={() => setMostrarModal(false)}
            >
              ✖
            </button>
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-contain bg-white mb-4 rounded"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <div className="mb-2">
              <strong className="text-sm text-gray-700">Descripción:</strong>
              <p className="text-sm text-gray-700 mt-1">{description}</p>
            </div>
            <p className="text-sm text-gray-700 mb-1"><strong>Precio:</strong> ${price}</p>
            {priceOriginal && priceOriginal > price && (
              <p className="text-sm text-red-500 mb-1 line-through"><strong>Antes:</strong> ${priceOriginal.toFixed(2)}</p>
            )}
            <p className="text-sm text-gray-700"><strong>Categoría:</strong> {category}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
