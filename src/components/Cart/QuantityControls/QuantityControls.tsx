import type { CartItem } from '@/types'

export function QuantityControls({
  item,
  maxQuantity,
  handleQuantityChange,
}: {
  item: CartItem
  maxQuantity: number
  handleQuantityChange: (productId: string, quantity: number) => void
}) {
  return (
    <div className="col-span-2">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() =>
            handleQuantityChange(item.productId, item.quantity - 1)
          }
          className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() =>
            handleQuantityChange(item.productId, item.quantity + 1)
          }
          disabled={item.quantity >= maxQuantity}
          className={
            item.quantity >= maxQuantity
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-emerald-100'
          }
          aria-label="Increase quantity"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
