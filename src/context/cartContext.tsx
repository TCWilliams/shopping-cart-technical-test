import { createContext, useContext } from 'react'
import type { CartState, CartAction } from '../types'

export interface CartContextType {
  state: CartState
  dispatch: (action: CartAction) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
