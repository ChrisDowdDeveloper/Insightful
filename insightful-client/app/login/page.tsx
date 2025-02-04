"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex-1 bg-white flex flex-col items-center justify-center py-8">
                <h1 className="font-bold text-customBlue text-3xl">Insightful</h1>
                <p className="text-gray-500 text-sm mt-2">
                    Welcome back! Please login to your account.
                </p>

                <div className="mt-8 w-full max-w-sm">
                    <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
                        <input
                            className="text-center border border-gray-300 rounded-md w-full h-12 focus:ring-2 focus:ring-customBlue focus:outline-none"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="text-center border border-gray-300 rounded-md w-full h-12 focus:ring-2 focus:ring-customBlue focus:outline-none"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <button
                            type="submit"
                            className="bg-customBlue text-white text-sm font-semibold border border-customBlue rounded-md py-3 px-6 hover:bg-blue-700 transition-shadow drop-shadow-md"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
