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

No special environment variables or seed data are required; product data is static in `src/data/products.ts`.

## Assumptions & tradeoffs

**Frontend only** - as a frontend candidate I've mocked the product catalogue as static data (`src/data/products.ts`). In a full implementation this would be fetched from `/api/v1/products` and cart operations would be managed server-side.

**Project structure** - features are co-located by component (`Cart/`, `ProductList/`) with shared context in `src/context/` and types centralised in `src/types.ts`.

**Cart persistence** - cart state is persisted to `localStorage` and rehydrated on load.

**Prices stored in cents** - all prices are integers in cents to avoid floating point rounding errors. Formatting to dollars happens only at the display layer via a single `formatPrice` utility.

**Denormalised cart items** - product data (name, price, image) is copied into the cart item at the time of adding. This means the cart reflects what the user saw when they added the item, rather than the live state of the catalogue. The tradeoff is minor data duplication in localStorage.

**Stock enforcement** - enforced client-side only. In production this would also be validated server-side to prevent race conditions between concurrent sessions.

**Promo codes** - validated client-side against a hardcoded map (`SAVE10`, `SAVE15`).

**Testing** - focused on core logic (reducer) and critical UI flows rather than exhaustive coverage. The reducer is tested as a pure function; components are tested via user-facing behaviour rather than implementation details.

**UI/UX** - mobile-friendly with accessibility considered (aria-labels, button roles, focus states). Currently scoring 100 on Lighthouse a11y audit, though not exhaustively manually audited.

## What I'd do with more time

- Optimistic UI updates with rollback on failure - skipped as this would require a more complete API mock layer to demonstrate meaningfully.
- Implement checkout flow - the "Checkout" button is currently a placeholder. I'd mock a POST to `/api/v1/orders`, clear the cart on success, and handle error states.
- Add e2e tests (e.g., Playwright) for full user flows.
- Lazy load `ProductList` and `Cart` via `React.lazy` - low value with the current mock data but worthwhile if the catalogue grows significantly.
- Refactor to Zustand or React Query if the app grew - Context + useReducer is appropriate at this scale but would struggle with more async state.

## Anything to flag

- **localStorage in tests** - mocked in `src/test/setup.ts` to avoid errors in the jsdom environment.
- **Import aliases** - `@` is aliased to `src/` in both `vite.config.ts` and `tsconfig.app.json`.
- **Images** - placeholder UI only, as per the brief.
