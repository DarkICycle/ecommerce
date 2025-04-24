import { useEffect, useState } from 'react'
import ProductosStore from '../store/ProductosStore'
import Card from '../components/Card'
import BtnCartFlotante from '../components/btnCartFlotante'
import Navbar from '../components/NavBar'
import Footer from '../sections/Footer'

const ProductosPage = () => {
  const {
    productos,
    cargarProductosDesdeFirebase,
    setCategoriaSeleccionada,
    obtenerProductosFiltrados
  } = ProductosStore()

  const [categorias, setCategorias] = useState([])
  const [menuCategoriasAbierto, setMenuCategoriasAbierto] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionadaState] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    cargarProductosDesdeFirebase()
  }, [cargarProductosDesdeFirebase])

  useEffect(() => {
    const categoriasUnicas = [...new Set(productos.map((producto) => producto.category))]
    setCategorias(categoriasUnicas)
  }, [productos])

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionadaState(categoria)
    setCategoriaSeleccionada(categoria)
    setMenuCategoriasAbierto(false)
  }

  const productosFiltrados = obtenerProductosFiltrados().filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-2 sm:px-6">
      <Navbar />
      <main className="p-4 sm:p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-xl mt-6">
        <div className="p-4 sm:p-6 rounded-2xl border border-gray-200">

          {/* Categorías y búsqueda */}
          <div className="flex justify-between flex-wrap items-center gap-4 mb-6">
            {/* Categorías escritorio */}
            <div className="hidden sm:flex gap-3 flex-wrap">
              <button
                onClick={() => handleCategoriaClick('Todas')}
                className={`px-4 py-2 rounded-md transition ${categoriaSeleccionada === 'Todas'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Todas
              </button>
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => handleCategoriaClick(categoria)}
                  className={`px-4 py-2 rounded-md transition ${categoriaSeleccionada === categoria
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {categoria}
                </button>
              ))}
            </div>

            {/* Categorías móvil */}
            <div className="sm:hidden w-full">
              <button
                onClick={() => setMenuCategoriasAbierto(!menuCategoriasAbierto)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                {categoriaSeleccionada}
              </button>
              {menuCategoriasAbierto && (
                <div className="absolute left-4 right-4 bg-white shadow-md rounded-md mt-2 py-2 z-20">
                  <button
                    onClick={() => handleCategoriaClick('Todas')}
                    className={`block w-full px-4 py-2 text-left transition ${categoriaSeleccionada === 'Todas' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                  >
                    Todas
                  </button>
                  {categorias.map((categoria) => (
                    <button
                      key={categoria}
                      onClick={() => handleCategoriaClick(categoria)}
                      className={`block w-full px-4 py-2 text-left transition ${categoriaSeleccionada === categoria ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                      {categoria}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tarjetas de productos */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div key={producto.id} className="relative">
                  {producto.off && (
                    <span className="absolute top-2 left-2 bg-yellow-300 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-md">
                      En oferta
                    </span>
                  )}
                  <Card
                    title={producto.title}
                    image={producto.image}
                    description={producto.description}
                    stock={producto.stock}
                    category={producto.category}
                    price={(producto.price - (producto.price * (producto.percentage / 100))).toFixed(2)}
                    priceOriginal={producto.price}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No se encontraron productos.</p>
            )}
          </div>
        </div>
      </main>
      <BtnCartFlotante />
      <Footer />
    </div>
  )
}

export default ProductosPage
