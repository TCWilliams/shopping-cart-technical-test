import { describe, it, expect } from 'vitest'
import { cartReducer } from './cartReducer'
import type { CartState } from '../types'

const mockProduct = {
  id: 'prod_001',
  name: 'Gumboots',
  description: 'Knee-high, waterproof.',
  price: 4999,
  category: 'Footwear',
  stockCount: 12,
}

const emptyState: CartState = {
  cart: { items: [] },
}

const stateWithOneItem: CartState = {
  cart: {
    items: [
      {
        productId: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        quantity: 1,
        stockCount: mockProduct.stockCount,
      },
    ],
  },
}

describe('cartReducer', () => {
  it('should add a new item to empty cart', () => {
    const action = { type: 'ADD_ITEM' as const, product: mockProduct }
    const result = cartReducer(emptyState, action)

    expect(result.cart.items).toHaveLength(1)
    expect(result.cart.items[0]).toEqual({
      productId: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      quantity: 1,
      stockCount: mockProduct.stockCount,
    })
  })

  it('should increment quantity when adding existing item', () => {
    const action = { type: 'ADD_ITEM' as const, product: mockProduct }
    const result = cartReducer(stateWithOneItem, action)

    expect(result.cart.items).toHaveLength(1)
    expect(result.cart.items[0].quantity).toBe(2)
  })

  it('should remove item from cart', () => {
    const action = { type: 'REMOVE_ITEM' as const, productId: mockProduct.id }
    const result = cartReducer(stateWithOneItem, action)

    expect(result.cart.items).toHaveLength(0)
  })

  it('should update item quantity', () => {
    const action = {
      type: 'UPDATE_QUANTITY' as const,
      productId: mockProduct.id,
      quantity: 5,
    }
    const result = cartReducer(stateWithOneItem, action)

    expect(result.cart.items[0].quantity).toBe(5)
  })

  it('should load entire cart', () => {
    const newCart = {
      items: [
        {
          productId: 'prod_002',
          name: 'Raincoat',
          price: 9999,
          quantity: 1,
          stockCount: 5, // Add a stockCount value appropriate for your test
        },
      ],
    }
    const action = { type: 'LOAD_CART' as const, cart: newCart }
    const result = cartReducer(emptyState, action)

    expect(result.cart).toEqual(newCart)
  })

  it('removes an item from the cart', () => {
    const action = { type: 'REMOVE_ITEM' as const, productId: mockProduct.id }
    const result = cartReducer(stateWithOneItem, action)
    expect(result.cart.items).toHaveLength(0)
  })
})
