# Dayflow — Human Resource Management System (HRMS)

> **Every workday, perfectly aligned.**

Dayflow is a modern, enterprise-grade, SaaS-style Human Resource Management System (HRMS) designed to streamline core HR operations, automate daily employee attendance, manage time-off requests, and enforce strict Role-Based Access Control (RBAC). 

Built specifically for high-efficiency environments and hackathons, Dayflow features a sleek, dark-themed UI paired with robust cloud database security.

---

## ✨ Key Features

- **Secure Authentication & Session Management**: Powered by Supabase Auth supporting secure sign-up, sign-in, and persistent user sessions via Next.js App Router.
- **Strict Role-Based Access Control (RBAC)**: Clear segregation of permissions between standard `Employee` accounts and privileged `HR / Admin` personnel.
- **Database-Level Security (RLS)**: Protected via robust Supabase Row Level Security (RLS) policies ensuring employees can only view and modify their own records, while HR has global oversight.
- **Admin Privilege Escalation Guard**: Registration for HR accounts requires a secure server-side verification token (`ADMIN_SECRET`), completely preventing unauthorized privilege escalation.
- **Core HR Workflows**:
  - **Attendance Tracking**: Real-time daily check-in and check-out management.
  - **Leave Management**: Streamlined application pipeline for Paid, Sick, and Unpaid leaves with history tracking.
- **Responsive SaaS Architecture**: Custom-built application shell featuring a collapsable sidebar, top navigation, user profile dropdowns, and full mobile responsiveness via shadcn/ui components.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router, Server Actions, Turbopack), TypeScript, Tailwind CSS v4, shadcn/ui, Lucide Icons
- **Backend & Database**: Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS), Supabase Storage
- **Deployment**: Vercel & Supabase

---

## 📂 Project Structure

```text
dayflow/
├── app/
│   ├── (auth)/          # Login & Signup routes and layouts
│   ├── admin/           # Admin/HR dashboard and management panels
│   ├── employee/        # Employee dashboard, attendance, and leave views
│   ├── auth/            # Shared server actions (auth handlers)
│   ├── layout.tsx       # Root layout with global styling & providers
│   └── page.tsx         # Root redirect/landing
├── components/
│   ├── layout/          # Dashboard application shell & navigation
