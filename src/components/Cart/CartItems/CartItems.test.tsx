import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { CartItems } from './CartItems'
import type { CartItem } from '@/types'

// Mock useCart to provide a dispatch spy
const dispatch = vi.fn()
vi.mock('@/context/cartContext', () => ({
  useCart: () => ({ dispatch }),
}))

afterEach(() => {
  cleanup()
  dispatch.mockClear()
})

describe('CartItems', () => {
  const items: CartItem[] = [
    {
      productId: 'prod_1',
      name: 'Test Product',
      price: 1000,
      quantity: 2,
      stockCount: 5,
    },
  ]

  it('renders product info and subtotal', () => {
    render(<CartItems items={items} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('$20.00')).toBeInTheDocument()
  })

  it('removes item when Remove button clicked', () => {
    render(<CartItems items={items} />)
    fireEvent.click(screen.getByText('Remove'))
    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      productId: 'prod_1',
    })
  })

  it('updates quantity via QuantityControls', () => {
    render(<CartItems items={items} />)
    const incBtn = screen.getByRole('button', { name: 'Increase quantity' })
    fireEvent.click(incBtn)
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      productId: 'prod_1',
      quantity: 3,
    })
  })

  it('removes item if quantity set to 0', () => {
    render(<CartItems items={[{ ...items[0], quantity: 1 }]} />)
    const decBtn = screen.getByRole('button', { name: 'Decrease quantity' })
    fireEvent.click(decBtn) // 1 -> 0, triggers remove
    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      productId: 'prod_1',
    })
  })
})
