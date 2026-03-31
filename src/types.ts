export interface Product {
  id: string
  name: string
  description: string
  imageUrl?: string
  price: number
  stockCount: number
}

export interface CartItem {
  productId: string
  quantity: number
  name: string
  price: number
  stockCount: number
}

export interface Cart {
  items: CartItem[]
}

export interface CartState {
  cart: Cart
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'LOAD_CART'; cart: Cart }

export interface ApiSuccess<T> {
  ok: true
  data: T
}
export interface ApiError {
  ok: false
  message: string
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError
