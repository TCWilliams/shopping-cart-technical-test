import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

describe('ProductCard', () => {
  const product: Product = {
    id: 'prod_1',
    name: 'Test Product',
    description: 'A great product',
    price: 1000,
    category: 'Tools',
    stockCount: 3,
  }

  afterEach(() => {
    cleanup()
  })

  it('renders product info and price', () => {
    render(
      <ProductCard product={product} inCart={0} handleAddToCart={vi.fn()} />,
    )
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
    expect(screen.getByText('A great product')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })

  it('calls handleAddToCart when button clicked', () => {
    const handleAddToCart = vi.fn()
    render(
      <ProductCard
        product={product}
        inCart={0}
        handleAddToCart={handleAddToCart}
      />,
    )
    const btn = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(btn)
    expect(handleAddToCart).toHaveBeenCalledWith(product)
  })

  it('disables button and shows Out of Stock if stockCount is 0', () => {
    render(
      <ProductCard
        product={{ ...product, stockCount: 0 }}
        inCart={0}
        handleAddToCart={vi.fn()}
      />,
    )
    const btn = screen.getByRole('button', { name: /add to cart/i })
    expect(btn).toBeDisabled()
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument()
  })

  it('disables button and shows Out of Stock if inCart >= stockCount', () => {
    render(
      <ProductCard product={product} inCart={3} handleAddToCart={vi.fn()} />,
    )
    const btn = screen.getByRole('button', { name: /add to cart/i })
    expect(btn).toBeDisabled()
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument()
  })

  it('shows Only X left if stock is low', () => {
    render(
      <ProductCard product={product} inCart={1} handleAddToCart={vi.fn()} />,
    )
    expect(screen.getByText(/only 2 left/i)).toBeInTheDocument()
  })

  it('shows In Stock if plenty available', () => {
    render(
      <ProductCard
        product={{ ...product, stockCount: 10 }}
        inCart={1}
        handleAddToCart={vi.fn()}
      />,
    )
    expect(screen.getByText(/in stock/i)).toBeInTheDocument()
  })
})
