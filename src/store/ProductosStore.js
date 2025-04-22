import { create } from 'zustand'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

// Store de productos usando Zustand
const ProductosStore = create((set, get) => ({
  productos: [], // Estado inicial de productos
  categoriaSeleccionada: 'Todas', // Categoría por defecto

  // Función para establecer la categoría seleccionada
  setCategoriaSeleccionada: (categoria) => {
    set({ categoriaSeleccionada: categoria })
  },

  // Función para obtener los productos filtrados por categoría
  obtenerProductosFiltrados: () => {
    const { productos, categoriaSeleccionada } = get()
    return categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter((producto) => producto.category === categoriaSeleccionada)
  },

  // Función para establecer los productos en el estado
  setProductos: (productos) => {
    set({ productos })
  },

  // Función para cargar productos desde Firebase
  cargarProductosDesdeFirebase: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'))
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      set({ productos: lista }) // Actualiza el estado con los productos obtenidos desde Firebase
    } catch (error) {
      console.error('Error al obtener productos:', error)
    }
  },
}))

export default ProductosStore
