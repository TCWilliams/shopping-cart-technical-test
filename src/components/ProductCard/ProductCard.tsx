import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

export function ProductCard({
  product,
  inCart,
  handleAddToCart,
}: {
  product: Product
  inCart: number
  handleAddToCart: (product: Product) => void
}) {
  return (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-emerald-100"
    >
      {/* Product Info */}
      <div className="p-5 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">
                {product.name}
              </h3>
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="w-full aspect-square bg-emerald-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-emerald-300">
              {product.name[0]}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mb-4">
            {product.stockCount === 0 || inCart >= product.stockCount ? (
              <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">
                Out of Stock
              </span>
            ) : product.stockCount < 5 || inCart >= product.stockCount - 5 ? (
              <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                Only {product.stockCount - inCart} left
              </span>
            ) : (
              <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Price and Button */}
        <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
          <div className="text-2xl font-bold text-emerald-700 flex-1">
            <div className="text-2xl font-bold text-emerald-700 flex-1"></div>
            {formatPrice(product.price)}
          </div>

          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.stockCount === 0 || inCart >= product.stockCount}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              product.stockCount === 0 || inCart >= product.stockCount
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-700 text-white hover:bg-green-700 active:scale-90 shadow-md'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
