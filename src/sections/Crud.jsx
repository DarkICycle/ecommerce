import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Navbar from '../components/NavBar'
import CardCrud from '../components/CardCrud'
import Editar from '../components/Editar'
import AgregarProducto from '../components/AgregarProducto' // asegúrate de tener este componente creado
import { useNavigate } from 'react-router-dom'

function Crud () {
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [mostrarModal, setMostrarModal] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
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

    const eliminarProducto = async (id) => {
        try {
            await deleteDoc(doc(db, 'productos', id))
            setProductos(productos.filter(producto => producto.id !== id))
        } catch (error) {
            console.error('Error eliminando producto:', error)
        }
    }

    const productosFiltrados = productos.filter(producto =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    )

    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h2 className="text-3xl font-semibold mb-4">Panel de Administración</h2>

                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg mb-6"
                />

                {/* Botón para Agregar Producto */}
                <button
                    className="mb-6 ml-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setProductoSeleccionado(null) // limpiar selección
                        setMostrarModal(true)
                    }}
                >
                    + Agregar Producto
                </button>
                <button
                    className="mb-6 ml-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                     navegate('/carritos')
                    }}
                >
                    Carritos
                </button>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {productosFiltrados.map(producto => (
                        <div key={producto.id} className="relative">
                            <div className="p-4 relative">
                                <CardCrud
                                    title={producto.title}
                                    image={producto.image}
                                    description={producto.description}
                                    price={producto.price}
                                >
                                    <div className="flex gap-2">
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
                                            onClick={() => eliminarProducto(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </CardCrud>
                            </div>
                        </div>
                    ))}
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
        </div>
    )
}

export default Crud
