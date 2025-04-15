// src/pages/Off.jsx

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
                setProductosConDescuento(conDescuento)
            } catch (error) {
                console.error('Error al obtener productos con descuento:', error)
            }
        }

        obtenerProductos()
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-lg shadow-lg">
                    <img src={notification} alt="Icono Descuento" className="w-8 h-8" />
                    <h2 className="text-3xl font-semibold text-white">Descuentos 30% en todos los productos</h2>
                </div>
                
                {/* Mostrar productos con descuento */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {productosConDescuento.length > 0 ? (
                        productosConDescuento.map(producto => (
                            <Card
                                key={producto.id}
                                title={producto.title}
                                image={producto.image}
                                price={(producto.price * 0.7).toFixed(2)}
                                description={producto.description}
                                stock={producto.stock}
                                category={producto.category}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-xl text-gray-600">No hay productos con descuento actualmente.</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Off
