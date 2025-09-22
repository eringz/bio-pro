--===============================================
--  BIO Pro - Smart Attendance & Analytic System
-- Database Schema
--===============================================

-- Drop existing tables if the exist (for reset)
DROP TABLE IF EXIST attendance CASCADE;
DROP TABLE IF EXIST employees CASCADE;

--===============================================
-- Employees Table
--===============================================
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    role VARCHAR (50) DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT NOW()
)


--===============================================
-- Attendance Table
--===============================================

