import type { CartState, CartAction } from '@/types'

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.cart.items.find(
        (i) => i.productId === action.product.id,
      )
      // Check if adding another item would exceed stock
      if (existing && existing.quantity >= action.product.stockCount) {
        return state // Don't add if limit reached
      }
      const items = existing
        ? state.cart.items.map((i) =>
            i.productId === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [
            ...state.cart.items,
            {
              productId: action.product.id,
              name: action.product.name,
              price: action.product.price,
              quantity: 1,
              stockCount: action.product.stockCount,
            },
          ]
      return { ...state, cart: { ...state.cart, items } }
    }
    case 'REMOVE_ITEM': {
      const items = state.cart.items.filter(
        (i) => i.productId !== action.productId,
      )
      return { ...state, cart: { ...state.cart, items } }
    }
    case 'UPDATE_QUANTITY': {
      const items = state.cart.items.map((i) =>
        i.productId === action.productId
          ? { ...i, quantity: action.quantity }
          : i,
      )
      return { ...state, cart: { ...state.cart, items } }
    }
    case 'LOAD_CART': {
      return { ...state, cart: action.cart }
    }
  }
}
