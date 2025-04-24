const ModalConfirmacion = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10 transition-all duration-300">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ¿Estás seguro de eliminar este producto?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default ModalConfirmacion
  