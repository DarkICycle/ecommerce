import { CartStore } from '../store/CartStore'
import { Link } from 'react-router-dom'
import flecha from '../assets/flecha.png'

const Cart = () => {
  const cart = CartStore((state) => state.cart)
  const increaseQuantity = CartStore((state) => state.increaseQuantity)
  const decreaseQuantity = CartStore((state) => state.decreaseQuantity)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0)

  return (
    <div className="p-6">
      <Link
        to="/"
        className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition"
      >
        <img src={flecha} className="h-5 w-5 mr-1" alt="Flecha" />
        Volver al Inicio
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Carrito de Compras 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista estilo tabla */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                    <th className="px-6 py-3 text-left">Imagen</th>
                    <th className="px-6 py-3 text-left">Producto</th>
                    <th className="px-6 py-3 text-left">Categoría</th>
                    <th className="px-6 py-3 text-left">Precio</th>
                    <th className="px-6 py-3 text-left">Cantidad</th>
                    <th className="px-6 py-3 text-left">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800 max-w-[200px] truncate">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                      <td className="px-6 py-4 text-gray-800">${item.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                          >
                            −
                          </button>
                          <span className="text-base font-medium">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-700">
                        ${(item.price * item.quantity).toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Caja resumen */}
          <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Resumen</h3>
            <div className="space-y-2 text-gray-700">
              <p>Total de productos: <strong>{totalItems}</strong></p>
              <p>Total a pagar: <strong className="text-green-600">${totalPrice.toFixed(3)}</strong></p>
            </div>
            <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition" 
            onClick={() => CartStore.getState().saveCartToFirestore()}>
              Guardar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

