
# Techstack tối ưu cho dự án cá nhân (MVP, chạy trên Vercel)

## Frontend
- **Framework:** Next.js (React, hỗ trợ SSR, routing, dễ deploy trên Vercel)
- **UI:** Chỉ dùng CSS thuần hoặc Tailwind CSS (nhẹ, dễ dùng)
- **State:** React useState/useContext (tránh Redux, chỉ dùng khi cần)
- **Form:** React Hook Form hoặc HTML form cơ bản
- **API:** Fetch API

## Backend
- **API:** Next.js API Routes (không cần server riêng, tận dụng serverless của Vercel)
- **Database ORM:** Prisma (nếu dùng SQL) hoặc trực tiếp với MongoDB

## Database
- **SQLite** (dùng với Prisma, phù hợp cho MVP, deploy dễ trên Vercel)
- **PostgreSQL** (nếu cần mở rộng, có thể dùng dịch vụ cloud như Supabase, Railway, Neon)

## Auth
- **NextAuth.js** (tích hợp sẵn cho Next.js, đơn giản, hỗ trợ nhiều provider)

## DevOps & Deployment
- **Vercel** (deploy cả frontend/backend, CI/CD tự động)
- **GitHub** (quản lý mã nguồn)

## Testing & Docs
- **Jest** (nếu cần test đơn giản)
- **README.md** (tài liệu dự án)

---

**Tất cả công nghệ đều dựa trên JavaScript/TypeScript, ưu tiên đơn giản, dễ deploy, dễ mở rộng cho cá nhân.**
