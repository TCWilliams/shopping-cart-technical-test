import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { QuantityControls } from './QuantityControls'
import type { CartItem } from '@/types'

describe('QuantityControls', () => {
  const item: CartItem = {
    productId: 'prod_1',
    name: 'Test Product',
    price: 1000,
    quantity: 2,
    stockCount: 5,
  }

  afterEach(() => {
    cleanup()
  })

  it('renders current quantity', () => {
    render(
      <QuantityControls
        item={item}
        maxQuantity={5}
        handleQuantityChange={vi.fn()}
      />,
    )
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls handleQuantityChange with increment', () => {
    const handleQuantityChange = vi.fn()
    render(
      <QuantityControls
        item={item}
        maxQuantity={5}
        handleQuantityChange={handleQuantityChange}
      />,
    )
    const incBtn = screen.getByRole('button', { name: 'Increase quantity' })
    fireEvent.click(incBtn)
    expect(handleQuantityChange).toHaveBeenCalledWith('prod_1', 3)
  })

  it('calls handleQuantityChange with decrement', () => {
    const handleQuantityChange = vi.fn()
    render(
      <QuantityControls
        item={item}
        maxQuantity={5}
        handleQuantityChange={handleQuantityChange}
      />,
    )
    const decBtn = screen.getByRole('button', { name: 'Decrease quantity' })
    fireEvent.click(decBtn)
    expect(handleQuantityChange).toHaveBeenCalledWith('prod_1', 1)
  })

  it('disables increment button at maxQuantity', () => {
    render(
      <QuantityControls
        item={{ ...item, quantity: 5 }}
        maxQuantity={5}
        handleQuantityChange={vi.fn()}
      />,
    )
    const increaseButton = screen.getByRole('button', {
      name: 'Increase quantity',
    })
    expect(increaseButton).toBeDisabled()
  })
})
