# Dayflow — Enterprise Human Resource Management System

<p align="center">
  <strong>Every workday, perfectly aligned.</strong>
  <br />
  A centralized platform for modern workforce management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-Role--Based%20Access-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Authentication-Supabase-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square" />
</p>

---

## Overview

**Dayflow** is a modern Human Resource Management System (HRMS) designed to digitize and streamline essential workforce management operations through a unified, role-based platform.

Built with Next.js, TypeScript, and Supabase, Dayflow brings employee administration, attendance tracking, leave management, and payroll operations into a centralized environment.

The platform follows a role-oriented architecture with dedicated interfaces for Employees and HR Administrators. Each role operates within its own access-controlled environment, ensuring that users interact only with the functionality and information relevant to their responsibilities.

Rather than treating HR operations as disconnected modules, Dayflow brings these workflows together into a consistent application experience.

### Project Objectives

- Centralize employee information and essential HR operations.
- Simplify daily attendance recording and workforce monitoring.
- Digitize leave application, review, and approval workflows.
- Provide employees with self-service access to their records.
- Establish secure role-based access boundaries between employees and administrators.
- Build a maintainable and extensible architecture suitable for future enhancements.

---

## Core Features

Dayflow is organized around five primary functional areas.

### 1. Authentication & Role-Based Access Control

A dedicated authentication and authorization layer separates employee functionality from privileged administrative operations.

**Key Capabilities**

- **Dual-Portal Architecture:** Separate application experiences and protected routes for `Employee` and `HR / Admin` roles.
- **Role-Based Authorization:** Access restrictions based on authenticated user roles.
- **Protected Administrator Onboarding:** HR account creation requires a server-side `ADMIN_SECRET`, preventing unauthorized administrative registration.
- **Session Persistence:** Supabase Authentication maintains authenticated sessions through secure HTTP-only cookies.
- **Route Protection:** Next.js middleware-based routing guards manage access to protected application routes.

### 2. Interactive Dashboards

Role-specific dashboards provide users with a centralized overview of relevant workforce information.

**Employee Dashboard**
- Personal profile overview.
- Attendance statistics and current-day status.
- Leave balance and request-related information.
- Quick access to frequently used HR operations.
- Recent activity and notification feed.

**HR Administrator Dashboard**
- Organization-wide employee statistics.
- Workforce attendance overview.
- Pending leave application summaries.
- Centralized access to administrative operations.

### 3. Attendance Management

The attendance module provides a structured workflow for recording and monitoring employee working hours.

**Employee Capabilities**
- Daily check-in and check-out functionality.
- Timestamp-based attendance recording.
- Current-day attendance status indicators.
- Personal attendance information.

**Administrator Capabilities**
- Centralized access to company-wide attendance records.
- Organization-wide daily attendance monitoring.
- Workforce activity visibility through administrative interfaces.

### 4. Leave & Time-Off Management

Dayflow implements a structured leave application and approval pipeline connecting employee requests with HR administrative decisions.

**Employee Capabilities**
- Submit leave applications through a self-service interface.
- Select leave categories: Paid, Sick, and Unpaid.
- Specify leave start and end dates.
- Include optional remarks with applications.
- Access previously submitted requests and their statuses.

**HR Administrator Capabilities**
- View organization-wide leave applications.
- Review pending employee requests.
- Approve or reject leave applications.
- Manage leave requests through a centralized administrative interface.

### 5. Payroll & Employee Profile Management

The payroll and profile modules provide access to employee records and compensation-related information.

**Employee Capabilities**
- View registered personal information.
- Access individual profile details.
- View compensation history.
- Access mock PDF payslip views.

**HR Administrator Capabilities**
- Access the organization-wide employee directory.
- View employee information.
- Manage salary structures through administrative controls.

---

## Technology Stack

Dayflow uses a modern full-stack JavaScript architecture, combining a server-rendered application framework, strongly typed development, reusable UI components, and a managed PostgreSQL backend.

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | Next.js 16 | Application framework and routing |
| Programming Language | TypeScript | Type safety and maintainable development |
| Application Architecture | App Router | File-system-based application routing |
| Server Logic | Server Actions | Server-side application operations |
| Styling | Tailwind CSS v4 | Utility-first styling |
| UI Components | shadcn/ui | Reusable interface components |
| Icon Library | Lucide React | Interface iconography |
| Authentication | Supabase Auth | User authentication and session management |
| Database | PostgreSQL | Relational data persistence |
| Database Platform | Supabase | Managed database and authentication infrastructure |
| Security | Row Level Security | Database-level access control |
| Build Tooling | Turbopack | Development and build tooling |
| Deployment | Vercel | Application hosting and deployment |

### Architectural Approach

The application follows a modular architecture that separates authentication, employee operations, administrative workflows, and data access.

**1. Presentation Layer**

- Role-specific dashboards and application interfaces.
- Shared layout components and navigation.
- Reusable UI components.

**2. Application Logic Layer**

- Server Actions for authentication and business operations.
- Employee-specific operations and workflows.
- Administrative operations with privileged access.

**3. Authentication & Authorization Layer**

- Supabase authentication.
- Session management through HTTP-only cookies.
- Middleware-based route protection.
- Role-specific access restrictions.

**4. Data Layer**

- Supabase server-side client.
- PostgreSQL database.
- Row Level Security policies.
- Server-side data access.

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

## Security & Access Control

Security is an important consideration in Dayflow's application architecture. The platform combines authentication, application-level route protection, and database-level access controls.

### Authentication

Supabase Auth handles user authentication and session management. Authenticated sessions are maintained using secure HTTP-only cookies.

### Role-Based Access

The application separates employee and administrator experiences through role-specific routes and protected layouts.

### Server-Side Operations

Server Actions handle sensitive application operations and provide a centralized location for server-side business logic.

### Database Security

PostgreSQL Row Level Security (RLS) provides database-level access control, allowing data access policies to be enforced at the database layer.

### Administrative Registration

Administrator account creation requires a server-side secret configured through the `ADMIN_SECRET` environment variable.

---

## Local Development Setup

Follow the instructions below to configure and run Dayflow in a local development environment.

### Prerequisites

Ensure the following tools and services are available:

- Node.js
- npm
- Git
- A Supabase account and project

### 1. Clone the Repository

```bash
git clone https://github.com/ritam-05/dayflow-hrms.git
cd dayflow-hrms
```

### 2. Install Dependencies

Install the project dependencies using npm.

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of the project.

Configure the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

ADMIN_SECRET=your_secure_admin_secret
```

**Environment Variable Reference**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL of the Supabase project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public/anonymous client key |
| `ADMIN_SECRET` | Server-side secret required for administrator account creation |

**Important Configuration Notes**

- Obtain the Supabase URL and client key from your Supabase project settings.
- Replace all placeholder values with valid credentials.
- Use a strong, unique value for `ADMIN_SECRET`.
- Never expose server-side secrets through client-side code.
- Do not commit `.env.local` or other files containing secrets to version control.

### 4. Start the Development Server

Run the following command:

```bash
npm run dev
```

Open the application in your browser:

[http://localhost:3000](http://localhost:3000)

The application will automatically redirect unauthenticated users to the login interface.

---

## Deployment

### Production Deployment with Vercel

Dayflow is configured for deployment on Vercel, with Supabase providing the database and authentication infrastructure.

**Deployment Procedure**

1. Push the application code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/).
3. Select **Add New Project**.
4. Import the Dayflow GitHub repository.
5. Configure the required environment variables under the project settings.

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ADMIN_SECRET=your_secure_admin_secret
   ```

6. Initiate the deployment by selecting **Deploy**.
7. Once the build completes successfully, access the application through the production URL generated by Vercel.

**Deployment Dependencies**

| Service | Responsibility |
|---|---|
| Vercel | Application hosting and deployment |
| Supabase Auth | User authentication and session infrastructure |
| Supabase PostgreSQL | Application data storage |
| Supabase RLS | Database-level access policies |

---

## Project Structure

The application follows a modular directory structure that separates authentication, employee workflows, administrative functionality, reusable components, and backend integrations.

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
│   │   ├── dashboard/      # Personal overview and alerts
│   │   ├── leave/          # Leave application form and history
│   │   ├── payroll/        # Salary history and payslips
│   │   └── profile/        # Personal details view
│   ├── auth/               # Server actions for Supabase Auth handling
│   ├── layout.tsx          # Root layout and global font configuration
│   └── globals.css         # Tailwind directives and custom scrollbars
├── components/
│   ├── layout/             # Application shell, responsive sidebar, headers
│   └── ui/                 # Reusable shadcn/ui primitives
├── lib/
│   └── supabase/           # Supabase SSR client configurations
└── middleware.ts           # Edge middleware for route protection and redirects
```

---

## Future Enhancements

The current implementation establishes the core HRMS workflows. The following enhancements represent potential extensions to improve automation, reporting, and organizational capabilities.

| Enhancement | Description | Proposed Technology |
|---|---|---|
| Advanced Analytics | Interactive visualizations for attendance trends, workforce statistics, and leave distributions. | Recharts |
| Automated Payslip Generation | Generate downloadable PDF payslips and deliver them to employees through email. | react-pdf |
| Bulk Employee Onboarding | CSV-based employee import pipeline for large-scale organizational onboarding. | CSV Processing |
| Shift Scheduling | Calendar-based shift allocation and working-hour management across departments. | Calendar Integration |
| Email Notifications | Automated notifications for leave approvals, rejections, and important HR updates. | Resend / SendGrid |

These enhancements are intended to extend the existing modular architecture without disrupting the core employee and administrator workflows.

---

## Project Information

| Attribute | Details |
|---|---|
| Project Name | Dayflow |
| Category | Human Resource Management System |
| Application Type | Full-Stack Web Application |
| Architecture | Role-Based Multi-Portal Application |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend Infrastructure | Supabase |
| Database | PostgreSQL |
| Deployment Platform | Vercel |

---

<p align="center">
  <strong>Dayflow</strong>
  <br />
  Every workday, perfectly aligned.
</p>
