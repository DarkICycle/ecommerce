import React from 'react'

function CardCrud({ title, image, description, price, category, stock, children }) {
    return (
        <div className="max-w-xs bg-[#fdfcfa] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden transition hover:shadow-md">
            <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-56">
                <h2 className="text-lg font-semibold text-[#333] mb-1 line-clamp-1">{title}</h2>
                <p className="text-sm text-[#7c7c7c] line-clamp-1 mb-1">{description}</p>
                <p className="text-xs text-gray-500 mb-1">Categoría: {category}</p>
                <p className="text-xs text-gray-500 mb-2">Stock: {stock}</p>
                <div className="mt-auto flex justify-between items-center">
                    <span className="text-[#38a169] font-bold text-base">${price}</span>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CardCrud



