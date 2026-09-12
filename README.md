# 🌌 Dayflow — Enterprise Human Resource Management System

> **Every workday, perfectly aligned.**  
> A premium, dark-themed SaaS application engineered to streamline core human resource operations, built for speed, security, and scalability.

Dayflow is a modern HRMS featuring strict Role-Based Access Control (RBAC), real-time attendance tracking, leave application pipelines, and payroll management. It provides a seamless experience with dedicated, isolated portals for standard Employees and privileged HR Administrators.

---

## ✨ Core Features

### 1. Role-Based Access Control & Authentication

- **Dual-Portal System:** Distinct routing and UI experiences for `Employee` and `HR / Admin` roles.
- **Secure Onboarding:** HR account creation is strictly protected by a server-side `ADMIN_SECRET` to prevent privilege escalation.
- **Persistent Sessions:** Powered by Supabase Auth with secure HTTP-only cookies and Next.js middleware routing guards.

### 2. Interactive Dashboards

- **Employee Dashboard:** Quick-access metric cards (Profile, Attendance, Leave), current status indicators, and a recent activity notification feed.
- **HR Dashboard:** High-level enterprise metrics, live employee counts, and pending request trackers.

### 3. Attendance Management

- **Employee View:** Daily check-in and check-out tracking with timestamp logging and current-day status indicators.
- **Admin View:** Global, company-wide daily attendance logs to monitor the active workforce.

### 4. Leave & Time-Off Pipeline

- **Employee Self-Service:** Submit requests specifying leave type (Paid, Sick, Unpaid), date ranges, and optional remarks, alongside a personal request history table.
- **Admin Adjudication:** Centralized queue for HR to review, approve, or reject pending leave applications organization-wide.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** Lucide React
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security)
- **Deployment:** Vercel

### Application Architecture

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
🚀 Local Development Setup

Follow these steps to run Dayflow on your local machine.

1. Clone the Repository
git clone https://github.com/your-username/dayflow.git
cd dayflow
2. Install Dependencies
npm install
3. Environment Variables

Create a .env.local file in the root directory. You will need a Supabase project for the database credentials.

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

ADMIN_SECRET=dayflowadmin2026

4. Start the Development Server
npm run dev

Navigate to http://localhost:3000.

The middleware will automatically redirect you to the login screen.

🌐 Deployment (Vercel)

Dayflow is optimized for zero-config deployment on Vercel.

Push your code to a GitHub repository.
Log into Vercel and click Add New Project.
Import your Dayflow repository.
Critical: In the deployment settings, add your three Environment Variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ADMIN_SECRET
Click Deploy.

Vercel will handle the build process and provide a live production URL in under 2 minutes.

🔮 Future Enhancements (Post-Hackathon)

While the core MVP is fully functional, the architecture is designed to scale. Planned future updates include:

Analytics Dashboard: Integration with Recharts for visual data representation of attendance trends and leave distributions.
Automated PDF Generation: Using react-pdf to dynamically generate and email actual payroll slips to employees.
Bulk Onboarding: A CSV upload pipeline for HR to mass-import employee profiles during company onboarding.
Shift Scheduling: A calendar interface for assigning specific working hours and shifts to different departments.
Email Notifications: Webhook integrations with Resend/SendGrid to notify employees when their leave is approved/rejected.

## 📂 Project Structure
```text
dayflow/
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
