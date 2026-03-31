import { useState } from 'react'
import { useCart } from '@/context/cartContext'
import { addTax } from '@/lib/utils'
import { CartItems } from './CartItems'

const PROMO_CODES: { [key: string]: number } = {
  SAVE10: 0.1, // 10% discount
  SAVE15: 0.15, // 15% discount
}

export function Cart({
  onContinueShopping,
}: { onContinueShopping?: () => void } = {}) {
  const { state } = useCart()
  const { items } = state.cart

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [error, setError] = useState('')

  const applyPromo = () => {
    if (PROMO_CODES[promoCode.toUpperCase()]) {
      setDiscount(PROMO_CODES[promoCode.toUpperCase()])
      setError('')
    } else {
      setDiscount(0)
      setError('Invalid promo code')
    }
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const discountAmount = subtotal * discount
  const discountedSubtotal = subtotal - discountAmount

  const tax = addTax(discountedSubtotal, 0.15)
  const total = discountedSubtotal + tax

  if (items.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-emerald-100">
          <svg
            className="mx-auto h-16 w-16 text-emerald-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="text-xl text-gray-600 font-semibold">
            Your cart is empty
          </p>
          <p className="text-gray-500 mt-2">
            Start shopping to add items to your cart
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="border border-emerald-300 text-emerald-700 font-medium py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-emerald-200 font-semibold text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-3 text-right">Subtotal</div>
              <div className="col-span-2"></div>
            </div>

            <div className="divide-y divide-gray-100">
              <CartItems items={items} />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-span-3 lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 border border-emerald-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Order Summary
            </h3>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>

              <div className="flex gap-2">
                <input
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value)
                    setError('') // clear error as user types
                  }}
                  className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    error
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                  placeholder="Enter code"
                />

                <button
                  onClick={applyPromo}
                  className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                >
                  Apply
                </button>
              </div>

              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </div>

            {/* Summary Lines */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (15%)</span>
                <span>${(tax / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Discount Line - only show if discount applied */}
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ${(discountAmount / 100).toFixed(2)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-emerald-700">
                ${(total / 100).toFixed(2)}
              </span>
            </div>

            {/* Checkout Button - no action */}
            <button className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
              Proceed to Checkout
            </button>

            {/* Continue Shopping Link - no action */}
            <button
              className="w-full mt-3 border border-emerald-300 text-emerald-700 font-medium py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
