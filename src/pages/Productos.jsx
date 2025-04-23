import { useEffect, useState } from 'react'
import ProductosStore from '../store/ProductosStore'
import Card from '../components/Card' // Asegúrate de que la ruta sea correcta
import BtnCartFlotante from '../components/btnCartFlotante'
import Navbar from '../components/NavBar'

const ProductosPage = () => {
  const { productos, cargarProductosDesdeFirebase, setCategoriaSeleccionada, obtenerProductosFiltrados } = ProductosStore()
  
  const [categorias, setCategorias] = useState([])
  const [menuCategoriasAbierto, setMenuCategoriasAbierto] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionadaState] = useState('Todas')

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
    setCategoriaSeleccionadaState(categoria)
    setCategoriaSeleccionada(categoria)
    setMenuCategoriasAbierto(false)
  }

  // Obtener los productos filtrados según la categoría seleccionada
  const productosFiltrados = obtenerProductosFiltrados()

  return (
    <div className="">
      <Navbar />
      
      {/* Barra de Categorías (Con botón hamburguesa en móvil) */}
      <div className="flex justify-start gap-4 mb-6 mt-5 ml-5">
        {/* Vista en escritorio */}
        <div className="hidden sm:flex gap-4">
          <button
            onClick={() => handleCategoriaClick('Todas')}
            className={`px-4 py-2 rounded-md transition ${categoriaSeleccionada === 'Todas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoriaClick(categoria)}
              className={`px-4 py-2 rounded-md transition ${categoriaSeleccionada === categoria ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Vista en móvil: botón hamburguesa */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuCategoriasAbierto(!menuCategoriasAbierto)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            {categoriaSeleccionada}
          </button>

          {menuCategoriasAbierto && (
            <div className="absolute left-4 right-4 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 py-2 z-20 flex flex-col items-center">
              <button
                onClick={() => handleCategoriaClick('Todas')}
                className={`block w-full px-4 py-2 text-left transition ${categoriaSeleccionada === 'Todas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Todas
              </button>
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => handleCategoriaClick(categoria)}
                  className={`block w-full px-4 py-2 text-left transition ${categoriaSeleccionada === categoria ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas de productos */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl mx-auto px-4">
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
      </div>
      <BtnCartFlotante />
    </div>
  )
}

export default ProductosPage
