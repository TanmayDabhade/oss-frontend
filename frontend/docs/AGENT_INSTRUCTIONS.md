# OpenBoard – Agent Instructions

## Objective
Deliver OpenBoard as a high-signal OSS collaboration platform, iterating in phases:
1) Accounts/Profiles/Orgs/Projects
2) Issues/Applications + Matching v1
3) GitHub Webhooks (PR verification) + Badges
4) Messaging + Notifications
5) Analytics + Moderation
6) Bounties + Recruiter Mode

## Current Sprint Focus
**Phase 1 – Orgs & Projects CRUD** (server actions + protected pages).
- CRUD for `Organization` (create, list mine, basic invite stub)
- CRUD for `Project` (create, list public + mine, detail page)
- Ownership checks and auth everywhere
- Minimal UI (Tailwind), server components preferred

## Commands
- Dev: `pnpm dev`
- Typecheck: `pnpm typecheck`
- Prisma:
  - `pnpm dlx prisma generate`
  - `pnpm dlx prisma migrate dev --name <migration_name>`

## Environment
- `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `NEXTAUTH_URL`
- Never hardcode secrets. Use `/lib/env.ts` to read.

## Coding Standards
- TS strict. No `any` unless justified.
- Server Actions validate inputs (zod/handwritten).
- Don’t mutate Prisma models outside actions; keep business logic in `/app/.../actions.ts`.
- Revalidate affected paths after mutations: `revalidatePath('/projects');`.

## UI Standards
- Loading, empty, and error states for all pages.
- Forms must have accessible labels, `aria-*` where needed.
- Use simple Tailwind utility classes.

## Security
- Middleware protects `(protected)` routes and `/api/private/*`.
- Verify resource ownership before update/delete (compare `session.user.id` with DB owner).
- Sanitize Markdown if rendering untrusted content.

## Testing (lightweight for now)
- Prefer unit tests for utils (Vitest) and server actions that have non-trivial logic.
- Snapshot for small presentational components if useful.

## Deliverables per Task
- PLAN → CHANGES summary
- Updated `/docs/TASKS.md` checkboxes
- Passing typecheck and (if present) tests

## Out of Scope (for now)
- Real-time messaging
- Stripe integration
- Full-text search and embeddings
- Org invitations (email) – stub only
