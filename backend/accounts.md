# GoldRisk Trading Account API (Phase 9)

Authenticated trading-account management for registered GoldRisk users. Every
account endpoint requires a valid bearer token and operates **only** on the
accounts owned by the authenticated user. The API never trusts a `user_id`
from the client — the user identity always comes from the JWT claims.

## Architecture

```
routes/accounts.ts  ->  controllers/accountsController.ts  ->  services/accountService.ts
                                                                    |-> db/accountsRepository.ts
                                                                    |-> db/specificationsRepository.ts
                                                                    \-> utils/accountValidation.ts
```

```
users
  └── trading_accounts  ── account_specifications
```

* `usersRepository.ts` — Phase 8 authentication user records.
* `accountsRepository.ts` — `trading_accounts` CRUD. Every query is scoped by
  `user_id` **in SQL**, so an account cannot be reached through another user's
  id even if a bug in the service layer skipped a check.
* `specificationsRepository.ts` — `account_specifications` CRUD, every query
  joins through `trading_accounts` on `user_id`.
* `accountService.ts` — validation, default/active account rules, ownership
  checks, duplicate detection.
* `accountValidation.ts` — field-level validators following the Phase 8
  `utils/validation.ts` convention.

No schema changes were needed: the Phase 7 tables, foreign keys, and CHECK
constraints already cover account management.

## Authentication

All account endpoints require `Authorization: Bearer <access-token>`. Missing,
malformed, expired, or revoked tokens receive `401`.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/accounts` | List the caller's trading accounts (default first). |
| `POST` | `/api/accounts` | Create a trading account. |
| `GET` | `/api/accounts/:id` | One owned account **plus its specifications**. |
| `PATCH` | `/api/accounts/:id` | Update an owned account. |
| `DELETE` | `/api/accounts/:id` | Delete an owned account (cascades to its specs). |
| `POST` | `/api/accounts/:id/specifications` | Add a specification. |
| `GET` | `/api/accounts/:id/specifications` | List the account's specifications. |
| `PATCH` | `/api/accounts/:id/specifications/:specId` | Update a specification. |
| `DELETE` | `/api/accounts/:id/specifications/:specId` | Delete a specification. |

## Account fields

| Field | Required | Rule |
| --- | --- | --- |
| `accountName` | Create | non-empty string, at most 100 chars |
| `broker` | Create | non-empty string, at most 100 chars |
| `accountType` | Create | non-empty string, at most 100 chars |
| `currency` | Create | non-empty string, at most 10 chars (e.g. `USD`, `USC`) |
| `usdConversion` | Create | number `> 0` (units of account currency per 1 USD) |
| `balance` | optional | number `>= 0`, defaults to `0` |
| `isActive` | optional | boolean, defaults to `true` |
| `isDefault` | optional | boolean, defaults to `false` |

Response accounts include `id`, `createdAt`, `updatedAt`, and all the fields
above.

## Specification fields

| Field | Required | Rule |
| --- | --- | --- |
| `symbol` | Create | non-empty string, at most 20 chars |
| `contractSize` | Create | number `> 0` |
| `minimumLot` | Create | number `> 0` |
| `maximumLot` | Create | number `> 0` |
| `lotStep` | Create | number `> 0` |

Cross-field rules match the database CHECK constraints and are re-validated on
update against the **merged** specification:

* `minimumLot <= maximumLot`
* `lotStep <= maximumLot`

## Default account behaviour

* At most one default account per user (enforced by the Phase 7 partial unique
  index and by transaction-safe repository logic).
* The user's **first** account always becomes the default.
* Creating a later account with `isDefault: true` — or PATCHing it — promotes
  it in the same transaction, clearing the previous default first.
* PATCHing `isDefault: false` on the current default just removes its default
  status (a user may then have no default at all).

## Active account behaviour

`isActive: false` keeps the account stored and listed, but marks it as the
user's current non-active trading account. Deactivating never deletes data.

## Ownership / security

* Ownership is always derived from the authenticated user's `req.user.id`.
* The repositories scope every query by `user_id` in SQL.
* Accessing another user's account or specification returns the **same 404
  ("Account not found." / "Specification not found.")** as a nonexistent
  resource, so the API does not leak whether another user's account exists.
* The frontend/next phase should never send a `user_id`; if one is sent it is
  ignored.

## Example — Exness Standard Cent (reference data)

```
POST /api/accounts
{
  "accountName": "Exness Standard Cent",
  "broker": "Exness",
  "accountType": "Standard Cent",
  "currency": "USC",
  "usdConversion": 100,
  "balance": 1220.30,
  "isActive": true,
  "isDefault": true
}

POST /api/accounts/<id>/specifications
{
  "symbol": "XAUUSDc",
  "contractSize": 1,
  "minimumLot": 0.01,
  "maximumLot": 200,
  "lotStep": 0.01
}
```

These values are **data**, not code: any broker/account/symbol can be added
without a schema change.

## Tests

`backend/src/accounts/accounts.test.ts` runs against in-memory repositories
(same pattern as `auth.test.ts`). It covers unauthenticated rejection,
account create/read/update/delete, invalid inputs, first-account defaulting,
safe default changes, active/inactive state, specification CRUD + validation,
cross-user access for accounts and specifications, and the 404 envelope.

PostgreSQL integration tests are only meaningful when `DATABASE_URL` is
configured. See `database.md`.