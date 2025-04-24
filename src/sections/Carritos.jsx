import { useEffect, useState } from 'react'
import { AdminCarritosStore } from '../store/AdminCarritosStore'
import Navbar from '../components/NavBar'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Carritos() {
  const { userCarts, fetchCarts } = AdminCarritosStore()
  const [selectedCart, setSelectedCart] = useState(null)
  const [loading, setLoading] = useState(false) 

  useEffect(() => {
    fetchCarts()
  }, [])

  const handleUpdate = async () => {
    setLoading(true) 
    const cartRef = doc(db, 'carritos', selectedCart.id)
    await updateDoc(cartRef, { cart: selectedCart.cart })
    setSelectedCart(null)
    fetchCarts()
    setLoading(false) 
  }

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'carritos', selectedCart.id))
    setSelectedCart(null)
    fetchCarts()
  }

  const handleChange = (index, field, value) => {
    const updated = [...selectedCart.cart]
    updated[index][field] = field === 'quantity' ? parseInt(value) : value
    setSelectedCart({ ...selectedCart, cart: updated })
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">🛒 Gestión de Carritos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userCarts.map((cart) => (
            <div
              key={cart.id}
              onClick={() => setSelectedCart(cart)}
              className="flex items-center justify-between p-6 rounded-lg mb-4 bg-white shadow-md cursor-pointer transition duration-300 hover:bg-blue-100 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {cart.id[0]}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-semibold text-gray-800 w-full overflow-hidden text-ellipsis whitespace-nowrap"
                    title={cart.id}
                  >
                    {cart.id.length > 20 ? `${cart.id.substring(0, 10)}...` : cart.id}
                  </h3>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Ver detalles</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCart && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg sm:max-w-xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Editar carrito de {selectedCart.id}</h3>
            <ul className="space-y-4">
              {selectedCart.cart.map((item, index) => (
                <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full sm:w-1/2 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full sm:w-1/4 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto mb-4 sm:mb-0"
              disabled={loading} 
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Guardar cambios'
              )}
            </button>


              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 w-full sm:w-auto mb-4 sm:mb-0"
              >
                Eliminar carrito
              </button>
              <button
                onClick={() => setSelectedCart(null)}
                className="text-gray-600 hover:underline text-lg w-full sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Carritos
