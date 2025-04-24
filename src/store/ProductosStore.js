import { create } from 'zustand'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'


const ProductosStore = create((set, get) => ({
  productos: [], 
  categoriaSeleccionada: 'Todas', 

 
  setCategoriaSeleccionada: (categoria) => {
    set({ categoriaSeleccionada: categoria })
  },

 
  obtenerProductosFiltrados: () => {
    const { productos, categoriaSeleccionada } = get()
    return categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter((producto) => producto.category === categoriaSeleccionada)
  },

 
  setProductos: (productos) => {
    set({ productos })
  },

  
  cargarProductosDesdeFirebase: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'))
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      set({ productos: lista }) 
    } catch (error) {
      console.error('Error al obtener productos:', error)
    }
  },
}))

export default ProductosStore
