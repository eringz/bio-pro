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

    
}