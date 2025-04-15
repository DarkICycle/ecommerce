import React, { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Editar = ({ isOpen, onClose, producto, onGuardar }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  })

  useEffect(() => {
    if (producto) {
      setFormData({
        title: producto.title,
        description: producto.description,
        price: producto.price,
        image: producto.image
      })
    }
  }, [producto])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const productoRef = doc(db, 'productos', producto.id)
      await updateDoc(productoRef, {
        ...formData,
        price: parseFloat(formData.price)
      })

      onGuardar({ ...producto, ...formData })
      onClose()
    } catch (error) {
      console.error('Error al actualizar producto:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-[#fdfcfa] p-6 rounded-2xl w-full max-w-md shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
            <input
              type="text"
              name="image"
              placeholder="URL de la imagen"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editar
