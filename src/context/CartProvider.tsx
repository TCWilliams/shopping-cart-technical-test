import { useReducer, type ReactNode, useEffect } from 'react'
import { cartReducer } from './cartReducer'
import { CartContext } from './cartContext'
import type { CartState } from '@/types'

const STORAGE_KEY = 'farmlands_cart'

const initialState: CartState = {
  cart: { items: [] },
}

function getInitialState(): CartState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to restore cart from localStorage:', error)
  }
  return initialState
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    getInitialState,
  )

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
