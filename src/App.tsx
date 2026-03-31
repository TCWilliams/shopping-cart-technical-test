import { useState } from 'react'
import { CartProvider } from '@/context/CartProvider'
import { useCart } from '@/context/cartContext'
import { ProductList } from '@/components/ProductList'
import { Cart } from '@/components/Cart'

function AppContent() {
  const [view, setView] = useState<'products' | 'cart'>('products')
  const { state } = useCart()
  const cartItemCount = state.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-700 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 tracking-tight ">
            GreenMeadows Store
          </h1>

          {/* Navigation */}
          <nav className="flex gap-3">
            <button
              onClick={() => setView('products')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                view === 'products'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              Browse Products
            </button>
            <button
              onClick={() => setView('cart')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 border-2 cursor-pointer ${
                view === 'cart'
                  ? 'bg-white text-emerald-800 border-emerald-700 shadow-md'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border-transparent'
              }`}
            >
              My Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        {view === 'products' ? (
          <ProductList />
        ) : (
          <Cart onContinueShopping={() => setView('products')} />
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
