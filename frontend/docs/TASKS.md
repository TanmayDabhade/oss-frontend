# Tasks – Phase 1 (Live)

## 1. Organizations (CRUD)
- [x] `POST` create organization (server action)
- [x] List my organizations (server component)
- [x] Organization page with basic details
- [x] Ownership checks; only owners can edit
- [ ] (Stub) invite member UI – no email send yet
- [x] Update docs & revalidate paths

## 2. Projects (CRUD)
- [ ] Create project under user or org (server action)
- [ ] List my projects + public projects
- [ ] Project detail page (slug)
- [ ] Ownership checks on edit/delete
- [ ] Basic tags array & visibility select
- [ ] Error/loading/empty states
- [ ] Revalidate affected paths

## 3. Plumbing
- [x] `lib/env.ts` type-safe env
- [x] Zod input schemas for actions
- [x] Add `CHANGELOG.md` entry
- [ ] Minimal tests for utils (slugify)

## 4. Follow-ups (Post Phase 1)
- [ ] Set up database and run migration: `npx prisma migrate dev --name init_user_organization_project_schema`
- [ ] Configure environment variables (.env file with DATABASE_URL, AUTH_SECRET, GitHub OAuth credentials)
- [ ] Test organization CRUD functionality end-to-end
- [ ] Add organization member invitation system (email integration)
- [ ] Implement Projects CRUD (Phase 1 continuation)
