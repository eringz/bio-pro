const BASE_URL = "http://localhost:5000";

// Registration API
export async function uploadFace(image: string) {
    // return request(`${BASE_URL}/`, { image });
    return request("/api/face/upload", { image });
}

// Verify face (for attendance)
export async function verifyFace(image: string) {
  return request(`${BASE_URL}/attendances`, {
    user_id: 1,        // test muna
    status_id: 1,      // "Time in"
    device_no: 1,
    face_id: 1,
    image,
  });
}

// Save full user registration + face template
export async function registerUser(data: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email_address: string;
    role: string;
    face_template: string;
}) {
    return request(`${BASE_URL}/users`, data);
};


// Generic request wrapper
async function request(url: string, body: object) {
    console.log("Sending request to:", url, body);
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

          if (!res.ok) throw new Error(`Request failed: ${res.status}`);

          const data = await res.json();
          console.log(`Response: ${data}`);
          return data;
    } catch (err) {
        console.error(`Request to ${url} failed: `, err);
        return null;
    }
}