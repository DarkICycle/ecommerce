import React from 'react'

function CardCrud({ title, image, description, price, category, stock, children }) {
    return (
        <div className="max-w-xs bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="bg-white">
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-contain p-4"
                />
            </div>
            <div className="bg-[#f3f4f6] px-4 py-3 flex flex-col justify-between h-56 font-[Inter,sans-serif]">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-1">{description}</p>
                <p className="text-xs text-gray-500 mb-1 italic">Categoría: {category}</p>
                <p className="text-xs text-gray-500 mb-2">Stock: {stock}</p>
                <div className="mt-auto flex justify-between items-center gap-2">
                    <span className="text-green-600 font-bold text-base">${price}</span>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CardCrud
