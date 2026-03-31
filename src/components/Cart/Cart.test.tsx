import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Cart } from './Cart'
import { CartProvider } from '@/context/CartProvider'

describe('Cart', () => {
  it('shows empty cart message', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>,
    )
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()
  })
})
