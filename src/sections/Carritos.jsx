import { useEffect, useState } from 'react'
import { AdminCarritosStore } from '../store/AdminCarritosStore'
import Navbar from '../components/NavBar'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Carritos() {
  const { userCarts, fetchCarts } = AdminCarritosStore()
  const [selectedCart, setSelectedCart] = useState(null)

  useEffect(() => {
    fetchCarts()
  }, [])

  const handleUpdate = async () => {
    const cartRef = doc(db, 'carritos', selectedCart.id)
    await updateDoc(cartRef, { cart: selectedCart.cart })
    setSelectedCart(null)
    fetchCarts()
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
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">🛒 Gestión de carritos</h2>

        {userCarts.map((cart) => (
          <div
            key={cart.id}
            onClick={() => setSelectedCart(cart)}
            className="flex items-center justify-between p-6 rounded-lg mb-4 bg-white shadow-lg cursor-pointer transition hover:bg-gray-50 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {cart.id[0]}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{cart.id}</h3>
                
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {selectedCart && (
        <div className="fixed inset-0  backdrop-blur-md bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Editar carrito de {selectedCart.id}</h3>
            <ul className="space-y-3">
              {selectedCart.cart.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    className="border px-2 py-1 rounded w-1/2"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    className="border px-2 py-1 rounded w-1/4"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Guardar cambios
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Eliminar carrito
              </button>
              <button
                onClick={() => setSelectedCart(null)}
                className="text-gray-600 hover:underline"
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
