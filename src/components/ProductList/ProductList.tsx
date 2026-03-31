import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/context/cartContext'
import { getProducts } from '@/data/products'
import type { Product } from '@/types'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { dispatch, state } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    const cartItem = state.cart.items.find((i) => i.productId === product.id)
    const currentQuantity = cartItem?.quantity ?? 0
    const canAddMore = currentQuantity < product.stockCount

    if (canAddMore) {
      dispatch({ type: 'ADD_ITEM', product })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Featured Products
        </h2>
        <p className="text-gray-600">
          Browse our selection of farming essentials and supplies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const cartItem = state.cart.items.find(
            (i) => i.productId === product.id,
          )
          const inCart = cartItem?.quantity ?? 0
          return (
            <ProductCard
              key={product.id}
              product={product}
              inCart={inCart}
              handleAddToCart={handleAddToCart}
            />
          )
        })}
      </div>
    </div>
  )
}
