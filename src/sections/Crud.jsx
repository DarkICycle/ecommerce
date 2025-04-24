import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Navbar from '../components/NavBar'
import CardCrud from '../components/CardCrud'
import Editar from '../components/Editar'
import AgregarProducto from '../components/AgregarProducto'
import { useNavigate } from 'react-router-dom'
import ModalConfirmacion from '../components/ModalConfirmacion'


function Crud() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const navegate = useNavigate()

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProductos(lista)
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    obtenerProductos()
  }, [])

  const guardarEdicion = (productoEditado) => {
    setProductos(productos.map(p => p.id === productoEditado.id ? productoEditado : p))
  }

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto])
  }

  const eliminarProducto = async () => {
    try {
      await deleteDoc(doc(db, 'productos', idAEliminar))
      setProductos(productos.filter(producto => producto.id !== idAEliminar))
      setMostrarConfirmacion(false)
      setIdAEliminar(null)
    } catch (error) {
      console.error('Error eliminando producto:', error)
    }
  }

  const productosFiltrados = productos.filter(producto =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-2 sm:px-6">
      <Navbar />
      <main className="p-4 sm:p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-xl mt-6">
        <div className="p-4 sm:p-6 rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center">Panel de Administración</h2>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                onClick={() => {
                  setProductoSeleccionado(null)
                  setMostrarModal(true)
                }}
              >
                + Agregar Producto
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                onClick={() => navegate('/carritos')}
              >
                Carritos
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(producto => (
                <div key={producto.id} className="relative">
                  {producto.off && (
                    <span className="absolute top-2 left-2 bg-yellow-300 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-md">
                      En oferta
                    </span>
                  )}
                  <div className="p-4 relative">
                    <CardCrud
                      title={producto.title}
                      image={producto.image}
                      description={producto.description}
                      price={producto.price}
                    >
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-sm"
                          onClick={() => {
                            setProductoSeleccionado(producto)
                            setMostrarModal(true)
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => {
                            setIdAEliminar(producto.id)
                            setMostrarConfirmacion(true)
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </CardCrud>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No se encontraron productos.</p>
            )}
          </div>
        </div>
      </main>

      {/* Modal de edición */}
      {productoSeleccionado && (
        <Editar
          isOpen={mostrarModal}
          onClose={() => setMostrarModal(false)}
          producto={productoSeleccionado}
          onGuardar={guardarEdicion}
        />
      )}

      {/* Modal de agregar */}
      {!productoSeleccionado && (
        <AgregarProducto
          isOpen={mostrarModal}
          onClose={() => setMostrarModal(false)}
          onGuardar={agregarProducto}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      <ModalConfirmacion
        isOpen={mostrarConfirmacion}
        onConfirm={eliminarProducto}
        onCancel={() => {
          setMostrarConfirmacion(false)
          setIdAEliminar(null)
        }}
      />
    </div>
  )
}

export default Crud
