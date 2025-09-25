"use client"

import { useState } from "react";
import FaceCapture from "@/components/features/FaceCapture";
import { registerUser } from "@/lib/api/face";

export default function RegisterForm() {
    const [form, setForm] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email_address: "",
        contact_number: "",
        role: "",
        face_template: "",
    });

    const [status, setStatus] = useState("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFaceCapture = (faceTemplate: string) => {
        setForm({ ...form, face_template: faceTemplate});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.face_template) {
            setStatus("Please capture your face befor submitting");
            return;
        }
        
        try {

        } catch (err) {
            console.error(err);
            setStatus("Server error");
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto"
        >
            <h1 className="text-xl font-bold text-center">Register New User</h1>

            <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="middle_name" placeholder="Middle Name" value={form.middle_name} onChange={handleChange} className="border p-2 rounded" />
            <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="border p-2 rounded" required />
            <input type="email" name="email_address" placeholder="Email Address" value={form.email_address} onChange={handleChange} className="border p-2 rounded" required />
            <input type="tel" name="contact_number" placeholder="Contact Number" value={form.contact_number} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} className="border p-2 rounded" required />

            {/** Face Capture Section */}
            <div className="mt-4">
                <FaceCapture onCapture={handleFaceCapture} />
            </div>

            <button 
                type="submit" 
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
            >
                Register User
            </button>
            {status && <p className="mt-2 text-sm text-center">{status}</p>}
        </form>
    )
    
}