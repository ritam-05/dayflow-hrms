# Dayflow — Enterprise Human Resource Management System

<p align="center">
  <strong>Every workday, perfectly aligned.</strong>
  <br />
  A modern HRMS for secure, streamlined workforce operations.
  <br /><br />
  <a href="https://github.com/ritam-05/dayflow-hrms"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
  <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel" alt="Vercel" /></a>
</p>

---

## Overview

**Dayflow** is a role-based Human Resource Management System designed to simplify everyday HR operations through dedicated employee and HR administrator portals.

The application brings together authentication, attendance tracking, leave management, employee records, and payroll views in one interface. Its architecture uses Supabase for authentication and data storage, with access boundaries enforced through application-level route protection and PostgreSQL Row Level Security.

## Table of Contents

- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Planned Enhancements](#planned-enhancements)
- [Project Structure](#project-structure)

---

## Core Features

### 1. Authentication & Role-Based Access Control

- **Dual portals:** Separate routing and user experiences for Employee and HR / Admin roles.
- **Protected HR onboarding:** HR account creation requires a server-side `ADMIN_SECRET` to help prevent privilege escalation.
- **Persistent sessions:** Supabase Auth session handling with HTTP-only cookies and Next.js request routing guards.

### 2. Role-Specific Dashboards

| Employee Dashboard | HR Dashboard |
| --- | --- |
| Quick-access Profile, Attendance, and Leave metrics | Organization-level overview metrics |
| Current attendance status indicators | Employee counts |
| Recent activity and notification feed | Pending leave request tracking |

### 3. Attendance Management

- **Employee view:** Daily check-in and check-out with timestamp logging and current-day status indicators.
- **Admin view:** Company-wide daily attendance logs for workforce monitoring.

### 4. Leave & Time-Off Management

- **Employee self-service:** Submit leave requests with a leave type (Paid, Sick, or Unpaid), date range, and optional remarks.
- **Request history:** Employees can review their submitted leave applications.
- **HR review pipeline:** Administrators can review, approve, or reject pending leave requests across the organization.

### 5. Employee Profiles & Payroll

- **Profiles:** Employees can view their registered information; administrators can access the employee directory.
- **Employee payroll view:** Read-only compensation history and mock PDF payslip views.
- **HR payroll controls:** An administrative interface for managing organizational salary structures.

---

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) — App Router, Server Actions, Turbopack |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | Lucide React |
| Database | [Supabase](https://supabase.com/) — PostgreSQL |
| Authentication | Supabase Auth |
| Data security | PostgreSQL Row Level Security (RLS) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Application Architecture

The application separates authentication and session handling from the employee and HR workflows. Both portals use a shared dashboard shell and communicate with Supabase through the server-side data client.

```mermaid
flowchart TD

subgraph group_auth["Auth &amp; request boundary"]
  node_auth_pages["Login &amp; signup<br/>auth screens<br/>[page.tsx]"]
  node_auth_actions{{"Auth actions<br/>Server Actions<br/>[actions.ts]"}}
  node_request_proxy{{"Session proxy<br/>request middleware<br/>[proxy.ts]"}}
  node_supabase_middleware["Supabase middleware<br/>session adapter<br/>[middleware.ts]"]
end

subgraph group_employee["Employee portal"]
  node_employee_layout["Employee shell<br/>protected layout<br/>[layout.tsx]"]
  node_employee_dashboard["Employee dashboard<br/>self-service view<br/>[page.tsx]"]
  node_employee_actions{{"Employee actions<br/>Server Actions<br/>[actions.ts]"}}
  node_employee_attendance["Personal attendance<br/>employee workflow<br/>[page.tsx]"]
  node_employee_leave["Leave requests<br/>employee workflow<br/>[page.tsx]"]
  node_employee_records["Payroll &amp; profile<br/>employee records<br/>[page.tsx]"]
end

subgraph group_admin["HR admin portal"]
  node_admin_layout["Admin shell<br/>protected layout<br/>[layout.tsx]"]
  node_admin_dashboard["HR dashboard<br/>organization view<br/>[page.tsx]"]
  node_admin_actions{{"HR actions<br/>Server Actions<br/>[actions.ts]"}}
  node_admin_operations["HR operations<br/>admin workflows<br/>[page.tsx]"]
end

subgraph group_data["Data &amp; presentation"]
  node_dashboard_shell["Shared dashboard layout<br/>portal navigation"]
  node_supabase_server["Supabase server client<br/>SSR data client<br/>[server.ts]"]
  node_supabase[("Supabase platform<br/>external service")]
end

node_app_root["Next.js app root<br/>App Router runtime<br/>[layout.tsx]"]

node_app_root --> node_auth_pages
node_app_root --> node_employee_layout
node_app_root --> node_admin_layout
node_auth_pages -->|"submit credentials"| node_auth_actions
node_auth_actions -->|"authenticate"| node_supabase_server
node_request_proxy -->|"refresh session"| node_supabase_middleware
node_supabase_middleware -->|"cookie session"| node_supabase
node_request_proxy -->|"allow employee route"| node_employee_layout
node_request_proxy -->|"allow admin route"| node_admin_layout
node_employee_layout -->|"shared navigation"| node_dashboard_shell
node_admin_layout -->|"shared navigation"| node_dashboard_shell
node_employee_layout --> node_employee_dashboard
node_employee_layout --> node_employee_attendance
node_employee_layout --> node_employee_leave
node_employee_attendance -->|"clock events"| node_employee_actions
node_employee_leave -->|"submit request"| node_employee_actions
node_employee_actions -->|"scoped writes"| node_supabase_server
node_admin_layout --> node_admin_dashboard
node_admin_layout --> node_admin_operations
node_admin_operations -->|"approve and manage"| node_admin_actions
node_admin_actions -->|"privileged writes"| node_supabase_server
node_employee_dashboard -->|"personal reads"| node_supabase_server
node_admin_dashboard -->|"aggregated reads"| node_supabase_server
node_supabase_server -->|"Auth, PostgreSQL, RLS"| node_supabase
node_admin_actions -.->|"decision updates request"| node_employee_leave

click node_app_root "https://github.com/ritam-05/dayflow-hrms/blob/main/app/layout.tsx"
click node_auth_pages "https://github.com/ritam-05/dayflow-hrms/blob/main/app/(auth)/login/page.tsx"
click node_auth_actions "https://github.com/ritam-05/dayflow-hrms/blob/main/app/auth/actions.ts"
click node_request_proxy "https://github.com/ritam-05/dayflow-hrms/blob/main/proxy.ts"
click node_supabase_middleware "https://github.com/ritam-05/dayflow-hrms/blob/main/lib/supabase/middleware.ts"
click node_employee_layout "https://github.com/ritam-05/dayflow-hrms/blob/main/app/employee/layout.tsx"
click node_employee_dashboard "https://github.com/ritam-05/dayflow-hrms/blob/main/app/employee/dashboard/page.tsx"
click node_employee_actions "https://github.com/ritam-05/dayflow-hrms/blob/main/app/employee/actions.ts"
click node_employee_attendance "https://github.com/ritam-05/dayflow-hrms/blob/main/app/employee/attendance/page.tsx"
click node_employee_leave "https://github.com/ritam-05/dayflow-hrms/blob/main/app/employee/leave/page.tsx"
click node_employee_records "https://github.com/ritam-05/dayflow-hrms/blob/main/app/employee/payroll/page.tsx"
click node_admin_layout "https://github.com/ritam-05/dayflow-hrms/blob/main/app/admin/layout.tsx"
click node_admin_dashboard "https://github.com/ritam-05/dayflow-hrms/blob/main/app/admin/dashboard/page.tsx"
click node_admin_actions "https://github.com/ritam-05/dayflow-hrms/blob/main/app/admin/actions.ts"
click node_admin_operations "https://github.com/ritam-05/dayflow-hrms/blob/main/app/admin/leave/page.tsx"
click node_dashboard_shell "https://github.com/ritam-05/dayflow-hrms/blob/main/components/layout/dashboard-layout.tsx"
click node_supabase_server "https://github.com/ritam-05/dayflow-hrms/blob/main/lib/supabase/server.ts"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
class node_auth_pages,node_auth_actions,node_request_proxy,node_supabase_middleware toneBlue
class node_employee_layout,node_employee_dashboard,node_employee_actions,node_employee_attendance,node_employee_leave,node_employee_records toneAmber
class node_admin_layout,node_admin_dashboard,node_admin_actions,node_admin_operations toneMint
class node_dashboard_shell,node_supabase_server,node_supabase toneRose
class node_app_root toneNeutral
```

---

## Local Development

Follow these steps to run Dayflow locally.

### Prerequisites

- Node.js and npm
- A Supabase project
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ritam-05/dayflow-hrms.git
cd dayflow-hrms
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add your Supabase project credentials and the HR onboarding secret:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_SECRET=replace_with_a_strong_private_secret
```

> **Security note:** Keep `ADMIN_SECRET` private. Do not commit `.env.local` or expose this value through client-side code. Use a strong, unique secret in each environment.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will direct unauthenticated visitors to the login screen.

---

## Deployment

Dayflow is configured for deployment on [Vercel](https://vercel.com/).

1. Push the project to a GitHub repository.
2. Sign in to Vercel and select **Add New Project**.
3. Import the Dayflow repository.
4. Add the following environment variables in the project settings:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_SECRET`

5. Deploy the project.

Vercel will build and deploy the application, then provide a production URL.

---

## Planned Enhancements

The current MVP provides the core HR workflows. The following enhancements are planned for future iterations:

| Enhancement | Planned capability |
| --- | --- |
| **Analytics dashboard** | Recharts visualizations for attendance trends and leave distributions. |
| **Automated PDF generation** | Generate and email actual payroll slips using react-pdf. |
| **Bulk onboarding** | CSV-based employee import for organization-wide onboarding. |
| **Shift scheduling** | Calendar-based assignment of employee shifts and working hours. |
| **Email notifications** | Resend / SendGrid webhook integrations for leave approval and rejection updates. |

---

## Project Structure

```text
dayflow-hrms/
├── app/
│   ├── (auth)/             # Authentication routes (Login, Signup)
│   ├── admin/              # HR-exclusive routes
│   │   ├── attendance/     # Global attendance logs
│   │   ├── dashboard/      # HR metrics overview
│   │   ├── employees/      # Company-wide personnel directory
│   │   ├── leave/          # Leave request approval queue
│   │   └── payroll/        # Salary structure management
│   ├── employee/           # Employee-exclusive routes
│   │   ├── attendance/     # Personal clock-in/out
│   │   ├── dashboard/      # Personal overview & alerts
│   │   ├── leave/          # Leave application form & history
│   │   ├── payroll/        # Salary history & slips
│   │   └── profile/        # Personal details view
│   ├── auth/               # Server actions for Supabase Auth handling
│   ├── layout.tsx          # Root layout & global font configuration
│   └── globals.css         # Tailwind directives & custom scrollbars
├── components/
│   ├── layout/             # Application shell, responsive sidebar, headers
│   └── ui/                 # Reusable shadcn/ui primitives
├── lib/
│   └── supabase/           # Supabase SSR client configurations
└── middleware.ts           # Edge middleware for route protection & redirects
```

---

<p align="center">
  Built with Next.js, TypeScript, Tailwind CSS, and Supabase.
  <br />
  <a href="https://github.com/ritam-05/dayflow-hrms">View repository</a>
</p>
