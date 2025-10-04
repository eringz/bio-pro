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
├── dashboard/
│   └── page.tsx                 # Protected (system users only)
├──  login/
│   └── page.tsx                 # System login (Admin/User only)
├── record/
│   └── page.tsx                 # Attendance check-in/out (employees only)
├── register/
│   └── page.tsx  
├── reports/
│   └── page.tsx                 # Protected
├── settings/
│   └── page.tsx                 # Protected
├── users/
│   └── page.tsx                 # Protected + Admin only
├── layout.tsx                   # Main layout (Navbar + Sidebar)
└── page.tsx                     # Landing page / redirect to login

components/
├── auth/                        # System authentication
│   ├── AdminLoginForm.tsx       # Email/password form for Admin/User
|   └── AuthForm.tsx
├── authMethods/                 # Attendance authentication (employees)
│   ├── FaceRecognition.tsx      # Face capture & verify
│   ├── Fingerprint.tsx          # Fingerprint scan
│   └── IDScan.tsx               # ID/QR scan
├── layout/
|   ├── Footer.tsx
|   ├── Navbar.tsx
|   ├── ProtectedPage.tsx
|   └── Footer.tsx
├── reports/
|   ├── ReportChart.tsx
|   └── ReportTable.tsx
├── ui/
|   ├── Button.tsx
|   ├── Card.tsx
|   ├── Input.tsx
|   ├── Loader.tsx
|   ├── Modal.tsx
|   └── Table.tsx
└── users
    ├── AddUserForm.tsx
    ├── EditUserModal.tsx
    └── UserTable.tsx                         

lib/
├── routes/
|   └── users.ts
├── auth.ts                      
├── attendance.ts                
└── reports.ts                   
                #

utils/
├── formatDate.ts
└── helpers.ts

```

### Backend Structure


