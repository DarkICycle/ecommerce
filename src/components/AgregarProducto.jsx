import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

const AgregarProducto = ({ isOpen, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    off: false,
    percentage: 0,
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: val })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
        percentage: parseInt(formData.percentage),
      }

      const docRef = await addDoc(collection(db, 'productos'), newProduct)
      onGuardar({ id: docRef.id, ...newProduct })
      onClose()
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        off: false,
        percentage: 0,
      })
    } catch (error) {
      console.error('Error al agregar producto:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agregar Producto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título del producto"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
            >
              <option value="Hogar">Hogar</option>
              <option value="Tecnologia">Tecnología</option>
              <option value="Electrodomesticos">Electrodomésticos</option>
              <option value="Belleza">Belleza</option>
              <option value="Gimnasio">Gimnasio</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Ropa">Ropa</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Automotriz">Automotriz</option>
              <option value="Deportes">Deportes</option>

            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Precio"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">¿Está en oferta?</label>
            <select
              name="off"
              value={formData.off ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, off: e.target.value === 'true' })}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje de descuento</label>
            <select
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={!formData.off}
            >
              <option value={0}>Sin descuento</option>
              <option value={10}>10%</option>
              <option value={20}>20%</option>
              <option value={30}>30%</option>
              <option value={40}>40%</option>
              <option value={50}>50%</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AgregarProducto
