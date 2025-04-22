import { useEffect, useState } from 'react'
import ProductosStore from '../store/ProductosStore'
import Card from '../components/Card' // Asegúrate de que la ruta sea correcta
import BtnCartFlotante from '../components/btnCartFlotante'
import Navbar from '../components/NavBar'

const ProductosPage = () => {
  const { productos, cargarProductosDesdeFirebase, setCategoriaSeleccionada, obtenerProductosFiltrados } = ProductosStore()
  
  const [categorias, setCategorias] = useState([])

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    cargarProductosDesdeFirebase()
  }, [cargarProductosDesdeFirebase])

  // Obtener las categorías únicas de los productos
  useEffect(() => {
    const categoriasUnicas = [...new Set(productos.map((producto) => producto.category))]
    setCategorias(categoriasUnicas)
  }, [productos])

  // Manejar el clic en las categorías
  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria)
  }

  // Obtener los productos filtrados según la categoría seleccionada
  const productosFiltrados = obtenerProductosFiltrados()

  return (
    <div className="">
      <Navbar className />
      <div className="flex justify-start gap-4 mb-6 mt-5 ml-5">
        <button
          onClick={() => handleCategoriaClick('Todas')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Todas
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => handleCategoriaClick(categoria)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Tarjetas de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productosFiltrados.map((producto) => (
          <Card
            key={producto.id}
            title={producto.title}
            image={producto.image}
            description={producto.description}
            stock={producto.stock}
            category={producto.category}
            price={(producto.price - (producto.price * (producto.percentage / 100))).toFixed(2)}
            priceOriginal={producto.price}
          />
        ))}
      </div>
      <BtnCartFlotante />
    </div>
  )
}

export default ProductosPage

