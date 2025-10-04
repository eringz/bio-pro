# ![BioPro Logo](./frontend/public/bio-pro.ico) BioPro



**BioPro** is a cutting-edge biometric attendance and employee management system designed to streamline workforce tracking and enhance organizational efficiency.

---

## Features

- [ ] **Biometric Attendance Tracking:** Capture employee time-ins and time-outs via biometric devices.
- [ ] **Multi-Location Support:** Track attendance from multiple devices and locations.
- [ ] **Real-Time Dashboard:** Monitor employee presence and attendance statistics live.
- [ ] **Role-Based Access:** Admin, HR, and Employee roles with custom permissions.
- [ ] **Reports & Analytics:** Generate detailed attendance and performance reports.
- [ ] **Face Recognition Integration (Planned):** Enhance security with facial recognition check-ins.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Frontend:** React.js / Next.js
- **Authentication:** JWT & Role-Based Access Control
- **APIs:** RESTful endpoints for attendance management
- **Other Tools:** Git, GitHub Actions for CI/CD

---

## Architecture

### Frontend Structure

 ``` plaintext

app/
├── login/
│   └── page.tsx                # System login (Admin/User only)
├── dashboard/
│   └── page.tsx                # Protected (system users only)
├── record/
│   └── page.tsx                 # Attendance check-in/out (employees only)
├── reports/
│   └── page.tsx                 # Protected
├── users/
│   └── page.tsx                 # Protected + Admin only
├── settings/
│   └── page.tsx                 # Protected
├── layout.tsx                   # Main layout (Navbar + Sidebar)
└── page.tsx                     # Landing page / redirect to login

components/
├── auth/                        # 🔐 System authentication
│   └── LoginForm.tsx            # Email/password form for Admin/User
├── authMethods/                 # 🕒 Attendance authentication (employees)
│   ├── FaceRecognition.tsx      # Face capture & verify
│   ├── Fingerprint.tsx          # Fingerprint scan
│   └── IDScan.tsx               # ID/QR scan
├── Navbar.tsx
├── Sidebar.tsx
├── ProtectedPage.tsx            # Wrapper for protected system routes
└── ...                          # Other UI components

lib/
├── supabaseClient.ts            # Supabase client config
├── auth.ts                      # System login/register/logout/session
├── attendance.ts                # Attendance verification + record save
├── reports.ts                   # Reports data
└── users.ts                     # User CRUD + role management

utils/
├── formatDate.ts
└── helpers.ts

```

### Backend Structure


