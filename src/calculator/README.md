# Calculator engine (not yet implemented)

This directory is reserved for GoldRisk's position-size calculation engine.

Nothing is implemented here in Phase 4.1. The homepage currently renders
`CalculatorPlaceholder`, a static, non-functional layout component under
`src/components/calculator/`, so the future engine has a home to plug into
without restructuring the app.

When implemented, this module should:

- Export pure functions that take `TradeInputs` (see `src/types/calculator.ts`)
  and return a `PositionSizeResult`.
- Contain no UI code and no network calls.
- Be unit-testable in isolation from the React components that call it.
