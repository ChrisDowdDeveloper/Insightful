"use client";

import { useRouter } from "next/navigation";

export default function CustomerServicePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Under Construction 🚧</h1>
            <p className="text-gray-600 text-lg">We're working hard to bring you the best support experience.</p>
            <p className="text-gray-600 text-lg">Please check back soon!</p>

            <button
                onClick={() => router.push("/dashboard")}
                className="mt-6 bg-customBlue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Return to Dashboard
            </button>
        </div>
    );
}
