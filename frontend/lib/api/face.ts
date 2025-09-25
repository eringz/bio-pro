// Registration API
export async function uploadFace(image: string) {
    return request("/api/face/upload", { image });
}

// Verify face (for attendance)
export async function verifyFace(image: string) {
    return request("/api/face/verify", { image });
}

// Save full user registration + face template
export async function registerUser(data: {
    firs_name: string;
    last_name: string;
    middle_name?: string;
    email_address: string;
    role: string;
    face_template: string;
}) {
    return request("/api/users/register", data);
};


// Generic request wrapper
async function request(url: string, body: object) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
    } catch (err) {
        console.error(`Request to ${url} failed: `, err);
        return null;
    }
}