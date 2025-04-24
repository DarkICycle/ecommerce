import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Navbar from '../components/NavBar'
import Card from '../components/Card'
import Off from '../sections/Off'
import Footer from '../sections/Footer'
import BtnCartFlotante from '../components/BtnCartFlotante'

function Home() {
  const [productosSinDescuento, setProductosSinDescuento] = useState([])


  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        const sinDescuento = lista.filter(producto => !producto.off)


        setProductosSinDescuento(sinDescuento)

      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    obtenerProductos()
  }, [])


  const productosInicio = productosSinDescuento.slice(0, 8)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-2 sm:px-6">
      <Navbar />
      <main className="p-4 sm:p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-xl mt-6">
        <section className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-2">Bienvenido a MiEcommerce</h2>
          <p className="text-gray-600 text-lg">Explora nuestros productos y encuentra lo que necesitas al mejor precio.</p>
        </section>

        {/* Ofertas destacadas */}
        <Off />

        {/* Productos de muestra */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-blue-100 pb-2">Productos destacados del catálogo</h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {productosInicio.map(producto => (
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
        </section>
      </main>
      <BtnCartFlotante />
      <Footer />
    </div>
  )
}

export default Home
