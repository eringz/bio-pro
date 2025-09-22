erDiagram
    USERS {
        int user_id PK
        string name
        string email
        string password
        string role
        int department_id FK
    }
    DEPARTMENTS {
        int department_id PK
        string name
    }
    SHIFTS {
        int shift_id PK
        int department_id FK
        time start_time
        time end_time
    }
    ATTENDANCE_LOGS {
        int log_id PK
        int user_id FK
        int shift_id FK
        datetime timestamp
        string action
        string status
    }

    USERS }|--|| DEPARTMENTS : "belongs to"
    USERS ||--o{ ATTENDANCE_LOGS : "has"
    SHIFTS ||--o{ ATTENDANCE_LOGS : "logs for"
    DEPARTMENTS ||--o{ SHIFTS : "has"
