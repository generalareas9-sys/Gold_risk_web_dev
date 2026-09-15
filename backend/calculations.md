# GoldRisk Calculation History API (Phase 10)

Authenticated calculation-history management for registered GoldRisk users.
Every endpoint requires a valid bearer token and operates **only** on
calculations owned by the authenticated user. The user identity always comes
from the JWT claims; if the client sends a `userId` it is ignored.

## Architecture

```
routes/calculations.ts  ->  controllers/calculationsController.ts  ->  services/calculationService.ts
                                                                      |-> db/calculationsRepository.ts
                                                                      |-> db/accountsRepository.ts  (tradingAccountId ownership)
                                                                      \-> utils/calculationValidation.ts
```

```
users
  └── trading_accounts
  └── calculation_history  (user_id CASCADE, trading_account_id SET NULL)
```

The Phase 7 `calculation_history` table already had everything needed — no
schema changes were required. `inputs`/`outputs` are JSONB snapshots of exactly
what the calculator received and produced, so a saved calculation can always
be reproduced. The scalar `symbol`/`position`/`entry_price` columns are a cheap
way to list and filter without unpacking the JSONB blobs.

## Authentication

All calculation endpoints require `Authorization: Bearer <access-token>`.
Missing, malformed, expired, or revoked tokens receive `401`.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/calculations` | List the caller's saved calculations, newest first. |
| `POST` | `/api/calculations` | Save one calculation result. |
| `GET` | `/api/calculations/:id` | One owned calculation. |
| `DELETE` | `/api/calculations/:id` | Delete an owned calculation. |

## Create payload

| Field | Required | Rule |
| --- | --- | --- |
| `symbol` | Yes | non-empty string, at most 20 chars (e.g. `XAUUSDc`) |
| `position` | Yes | exactly `BUY` or `SELL` |
| `entryPrice` | Yes | number `> 0` (number or numeric string) |
| `tradingAccountId` | No | string; the account must be owned by the caller |
| `inputs` | Yes | JSON object — the calculator input snapshot |
| `outputs` | Yes | JSON object — the calculator result snapshot |

`inputs`/`outputs` are **opaque**: the API only requires them to be JSON
objects. That keeps the endpoint decoupled from the calculator's shape, so
forward/reverse compatibility of stored snapshots is a display concern, not an
API concern. Referencing a `tradingAccountId` that is not owned (or does not
exist) returns `404 Account not found.` and the calculation is not stored.

## Response shape

A saved calculation echoes:

```json
{
  "success": true,
  "data": {
    "calculation": {
      "id": "1",
      "symbol": "XAUUSDc",
      "position": "BUY",
      "entryPrice": 4014.73,
      "tradingAccountId": null,
      "inputs": { "...": "the calculator input snapshot" },
      "outputs": { "recommendedLot": 0.08, "...": "the calculator result snapshot" },
      "createdAt": "2026-09-15T08:30:00.000Z"
    }
  }
}
```

The list endpoint returns `data.calculations` (an array), ordered newest
first. The detail endpoint mirrors the create response. Delete returns
`{ "success": true }`.

## Ownership / security

* Ownership is always derived from the authenticated user's `req.user.id`.
* The repository scopes every query by `user_id` **in SQL**.
* Accessing another user's calculation returns the **same 404
  ("Calculation not found.")** as a nonexistent one, so the API does not leak
  whether another user's calculation exists.
* A linked `tradingAccountId` is validated against the caller's own accounts
  before saving, using the same `accountsRepository.findById` ownership check
  as the Phase 9 account service.
* Deleting a trading account does **not** delete its history — the foreign key
  is `ON DELETE SET NULL`, so the saved calculation survives with
  `tradingAccountId: null`.

## Tests

`backend/src/calculations/calculations.test.ts` runs against in-memory
repositories (same pattern as `auth.test.ts` and `accounts.test.ts`). It
covers unauthenticated rejection, create/list/get/delete, validation errors
(missing fields, bad position, non-positive entry price, non-JSON
inputs/outputs), owned-account linking, cross-user isolation, and the 404
envelope. 24 tests, all green.

PostgreSQL integration tests are only meaningful when `DATABASE_URL` is
configured. See `database.md`.