import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductList } from './ProductList'
import { CartProvider } from '@/context/CartProvider'
import { products } from '@/data/products'

describe('ProductList', () => {
  it('renders product cards', async () => {
    render(
      <CartProvider>
        <ProductList />
      </CartProvider>,
    )
    const buttons = await screen.findAllByRole('button', {
      name: /add to cart/i,
    })
    expect(buttons).toHaveLength(products.length)
  })
})
