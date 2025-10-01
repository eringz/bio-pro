export default function OptionsPage() {

    const options = [
        {label: "Fingerprint", action:"fingerprint"},
        {label: "Face Recognition", action:"face"},
        {label: "RFID", action:"rfid"},
        {label: "Log In", action:"login"},
    ]
    return (
        <main>
            <h1 className="text-3xl font-bold mb-8">Attendance System</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {options.map((opt) => (
                <button
                    key={opt.action}
                    className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition"
                    onClick={() => alert(`${opt.label} selected!`)}
                >
                    {opt.label}
                </button>
                ))}
            </div>
            
        </main>
    )
}