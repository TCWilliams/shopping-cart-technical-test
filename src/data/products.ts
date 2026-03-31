import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Gumboots',
    description:
      'Waterproof, knee-high rubber boots. Essential for muddy paddocks and river crossings.',
    price: 4999,

    stockCount: 12,
  },
  {
    id: 'prod_002',
    name: 'Chicken Feed (20kg)',
    description:
      'Balanced layer pellets with added calcium. Keeps your hens happy and laying.',
    price: 2899,
    stockCount: 34,
  },
  {
    id: 'prod_003',
    name: 'Sheep',
    description:
      'Woolly and friendly. Perfect for grazing your paddocks and providing fresh wool.',
    price: 18999,
    stockCount: 3,
  },
  {
    id: 'prod_004',
    name: 'Fence Posts (pack of 10)',
    description:
      'Treated pine, 1.8m. Suitable for stock fencing and boundary lines.',
    price: 5499,
    stockCount: 0,
  },
  {
    id: 'prod_005',
    name: 'Jandals',
    description:
      'Classic NZ jandals. For when the gumboots come off at the back door.',
    price: 1299,
    stockCount: 2,
  },
  {
    id: 'prod_006',
    name: 'Rat Traps (pack of 6)',
    description:
      'Heavy-duty snap traps. Effective against rats in the barn, shed, or feed room.',
    price: 1899,
    stockCount: 28,
  },
]

export async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 300) // Simulate 300ms network delay
  })
}
