# Solution - Tim Williams

## Running the project

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
npm run test        # run tests
npm run coverage    # coverage report
```

- No special environment variables or seed data are required; product data is static in `src/data/products.ts`.

## Assumptions & tradeoffs

**Frontend only** - as a frontend candidate I've mocked the product catalogue as static data (`src/data/products.ts`). In a full implementation this would be fetched from `/api/v1/products`. Cart operations would be managed server-side.

**Cart persistence** - cart state is persisted to `localStorage` and rehydrated on load. In a production app this would live server-side.

**Prices stored in cents** - all prices are integers in cents to avoid floating point rounding errors. Formatting to dollars happens only at the display layer via a single `formatPrice` utility.

**Denormalised cart items** - product data (name, price, image) is copied into the cart item at the time of adding. This means the cart reflects what the user saw when they added the item, rather than the current state of the catalogue.

**Stock Handling (Implemented)** - The cart and product list both enforce stock levels: users cannot add more items than are available in stock. The "Add to Cart" button is disabled when the cart quantity reaches the product's stock count, and cart quantity controls are capped at available stock.

**Promo Code Support (Implemented)** - The cart supports promo/discount codes. Two codes are hardcoded: `PROMO10` (10% off) and `PROMO15` (15% off). Entering a valid code applies the discount to the order summary; invalid codes show an error message.

**UI/UX** - The design is mobile-friendly and uses Tailwind CSS for rapid styling. Accessibility is considered (aria-labels, button roles), but not exhaustively audited due to time limitations.

**Testing** - Core logic and UI flows are covered, but not every edge case (e.g., error boundaries, accessibility violations).

## What I'd do with more time

- Add e2e tests (e.g., Playwright or Cypress) for full user flows.
- Improve accessibility with automated and manual audits.
- Refactor context/reducer logic for larger scale (e.g., Redux Toolkit, Zustand, or React Query for async data).
- Add optimistic UI updates and error handling for network failures.
- Polish UI with more animations, transitions, and empty/loading states.

## Anything to flag or explain

- **Images on products:** These are just placeholders, I have not sourced images.
- **LocalStorage in Tests:** LocalStorage is mocked in `src/test/setup.ts` to avoid errors and noise in the test suite.
- **Import Aliases:** The `@` alias is set up for cleaner imports from `src/`.
- **Tailwind CSS:** Configured via Vite and works out of the box. No custom PostCSS config is required.
- **Component Testing:** All major components (Cart, ProductList, ProductCard, CartItems, QuantityControls) have dedicated test files.
