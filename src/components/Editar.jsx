import React, { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Editar = ({ isOpen, onClose, producto, onGuardar }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    off: 'No',
    percentage: '0'
  })

  useEffect(() => {
    if (producto) {
      setFormData({
        title: producto.title || '',
        description: producto.description || '',
        price: producto.price || '',
        image: producto.image || '',
        category: producto.category || '',
        off: producto.off ? 'Sí' : 'No',
        percentage: producto.percentage?.toString() || '0'
      })
    }
  }, [producto])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const productoRef = doc(db, 'productos', producto.id)
      await updateDoc(productoRef, {
        ...formData,
        off: formData.off === 'Sí',
        price: parseFloat(formData.price),
        percentage: parseInt(formData.percentage)
      })

      onGuardar({
        ...producto,
        ...formData,
        off: formData.off === 'Sí',
        price: parseFloat(formData.price),
        percentage: parseInt(formData.percentage)
      })

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
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
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
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
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
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
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              required
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
            <label className="block text-sm font-medium text-gray-700 mb-1">¿Está en oferta?</label>
            <select
              name="off"
              value={formData.off}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
            >
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>

          {formData.off === 'Sí' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje de Descuento</label>
              <select
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              >
                <option value={0}>Sin descuento</option>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
                <option value={30}>30%</option>
                <option value={40}>40%</option>
                <option value={50}>50%</option>
              </select>
            </div>
          )}

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
