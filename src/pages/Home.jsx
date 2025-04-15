import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Navbar from '../components/NavBar'
import Card from '../components/Card'
import Off from '../sections/Off'
import Footer from '../sections/Footer'

function Home() {
  const [productosSinDescuento, setProductosSinDescuento] = useState([])
  const [productosConDescuento, setProductosConDescuento] = useState([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        const sinDescuento = lista.filter(producto => !producto.off)
        const conDescuento = lista.filter(producto => producto.off)

        setProductosSinDescuento(sinDescuento)
        setProductosConDescuento(conDescuento)
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    obtenerProductos()
  }, [])

  const productosFiltrados = productosSinDescuento.filter(producto =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="px-6 sm:px-12 py-8">
        <section className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-2">Bienvenido a MiEcommerce</h2>
          <p className="text-gray-600 text-lg">Explora nuestros productos y encuentra lo que necesitas al mejor precio.</p>
        </section>

        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Sección sin descuento */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-blue-100 pb-2">Productos disponibles</h3>
          {productosFiltrados.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productosFiltrados.map(producto => (
                <Card
                  key={producto.id}
                  title={producto.title}
                  image={producto.image}
                  price={producto.price}
                  description={producto.description}
                  stock={producto.stock}
                  category={producto.category}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No se encontraron productos con ese nombre.</p>
          )}
        </section>

        {/* Sección con descuento (Off.jsx) */}
        <section className="mb-16">
          <Off productosConDescuento={productosConDescuento} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
