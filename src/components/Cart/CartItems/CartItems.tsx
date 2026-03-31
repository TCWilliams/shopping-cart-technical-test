import { QuantityControls } from '../QuantityControls'
import type { CartItem as CartItemType } from '@/types'
import { useCart } from '@/context/cartContext'
import { formatPrice } from '@/lib/utils'

export function CartItems({ items }: { items: CartItemType[] }) {
  const { dispatch } = useCart()

  const handleRemove = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId })
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemove(productId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
    }
  }

  return (
    <>
      {items.map((item) => (
        // Cart Item Row
        <div
          key={item.productId}
          className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-emerald-50 transition-colors"
        >
          {/* Product Info */}
          <div className="col-span-5">
            <div className="flex gap-3">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
          </div>

          <QuantityControls
            item={item}
            maxQuantity={item.stockCount}
            handleQuantityChange={handleQuantityChange}
          />

          {/* Subtotal */}
          <div className="col-span-3 text-right font-semibold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </div>

          {/* Remove Button */}
          <div className="col-span-2 text-right">
            <button
              onClick={() => handleRemove(item.productId)}
              className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
