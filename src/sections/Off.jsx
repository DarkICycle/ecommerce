import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Card from '../components/Card'
import notification from '../assets/notification.png'

function Off() {
    const [productosConDescuento, setProductosConDescuento] = useState([])
  
    useEffect(() => {
      const obtenerProductos = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'productos'))
          const lista = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
  
          const conDescuento = lista.filter(producto => producto.off)
          setProductosConDescuento(conDescuento.slice(0, 8))
        } catch (error) {
          console.error('Error al obtener productos con descuento:', error)
        }
      }
  
      obtenerProductos()
    }, [])
  
    return (
      <section className="mb-16">
        <div className="bg-gradient-to-br from-blue-300 via-blue-200 to-blue-100 rounded-xl shadow-lg p-6 border-2 border-yellow-200">
          <h3 className="text-3xl font-extrabold text-blue-900 mb-6 flex items-center justify-center gap-2 text-center">
            <img src={notification} alt="Notification" className="w-6 h-6" />
            Ofertas Destacadas
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productosConDescuento.length > 0 ? (
              productosConDescuento.map(producto => (
                <div className="relative" key={producto.id}>
                  <span className="absolute top-2 left-2 bg-yellow-300 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-md">
                    En oferta
                  </span>
                  <Card
                    title={producto.title}
                    image={producto.image}
                    price={(producto.price - (producto.price * (producto.percentage / 100))).toFixed(2)}
                    priceOriginal={producto.price}
                    description={producto.description}
                    category={producto.category}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No hay productos con descuento actualmente.</p>
            )}
          </div>
        </div>
      </section>
    )
  }
  
  export default Off