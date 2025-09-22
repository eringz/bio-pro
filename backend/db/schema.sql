--===============================================
--  BIO Pro - Smart Attendance & Analytic System
-- Database Schema
--===============================================

-- Drop existing tables if the exist (for reset)
DROP TABLE IF EXIST attendance CASCADE;
DROP TABLE IF EXIST users CASCADE;
DROP TABLE IF EXISTS attendance_status CASCADE
DROP TABLE IF EXISTS devices CASCADE

--===============================================
-- Employees Table
--===============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    role VARCHAR (50) DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT NOW()
);

--===============================================
-- Attendance Status Table
--===============================================
CREATE TABLE attendance_status (
    id PRIMARY KEY,
    status_name VARCHAR(20)
);


--===============================================
-- Device Location Table
--===============================================
CREATE TABLE devices (
    id PRIMARY KEY,
    location_name VARCHAR NOT NULL
);


--===============================================
-- Attendance Table
--===============================================
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    datetime TIMETAMP NOT NULL,
    device_no INT NOT NULL,
    status INT NOT NULL REFERENCES attendance_status(id)
);
