# Copilot Instructions for Inventory iPhone Resale Webapp

## Big Picture Architecture
- The project is a fullstack JS webapp for managing inventory and sales of used iPhones.
- Frontend: Next.js (React), using API routes for backend logic. UI is built with Tailwind CSS or plain CSS for simplicity.
- Backend: Next.js API routes, Prisma ORM for SQL database (SQLite for MVP, PostgreSQL for scaling).
- Auth: NextAuth.js for authentication and session management.
- All modules (account, warehouse, product, etc.) are separated by business logic and API endpoints, following RESTful conventions.

## Developer Workflows
- Deploy on Vercel: Push to main branch triggers auto-deploy.
- Local development: `npm run dev` for Next.js frontend/backend.
- Database migration: Use Prisma CLI (`npx prisma migrate dev`) for schema changes.
- Testing: Jest for unit tests (if present).
- Authentication: Configure providers in `pages/api/auth/[...nextauth].ts`.

## Project-Specific Conventions
- API routes are in `pages/api/` and follow `/api/{module}/{action}` pattern.
- Database models are defined in `prisma/schema.prisma`.
- Business logic for each module is split into separate files (see `tasks_*.md` for breakdown).
- Use TypeScript for all new code.
- UI pages for each module are in `pages/{module}/`.
- State management is minimal: use React context/hooks unless complexity demands more.

## Integration Points & Dependencies
- External DB: SQLite (local), PostgreSQL (cloud, e.g. Supabase/Neon).
- Auth: NextAuth.js, configured in API routes.
- ORM: Prisma, with migrations tracked in `prisma/migrations/`.
- Deployment: Vercel, auto CI/CD from GitHub.

## Examples & Patterns
- To add a new module, create API routes in `pages/api/{module}/`, UI in `pages/{module}/`, and update `prisma/schema.prisma`.
- For permissions, check user roles in API route handlers before processing requests.
- For reporting, aggregate data in API routes and expose via REST endpoints.

## Key Files & Directories
- `techstack.md`: Tech stack and deployment notes
- `module_relationship.md`: Module boundaries and relationships
- `tasks_*.md`: Task breakdown for each module
- `pages/`: Next.js pages and API routes
- `prisma/`: Database schema and migrations

---

For unclear patterns or missing documentation, ask the user for clarification or examples from their workflow.
