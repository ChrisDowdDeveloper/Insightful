"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [userNameOrEmail, setUserNameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex-1 bg-white flex flex-col items-center justify-center py-8">
                <div className="text-center space-y-6">
                    <h1 className="font-bold text-customBlue text-3xl">Insightful</h1>
                    <div>
                        <h2 className="text-customBlue text-xl font-semibold">
                        Transform Your Data into Actionable Insights
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                        Welcome back! Please login to your account.
                        </p>
                    </div>
                </div>
                <div className="mt-8 w-full max-w-sm">
                <form className="flex flex-col space-y-4">
                    <input
                    className="text-center border border-gray-300 rounded-md w-full h-12 focus:ring-2 focus:ring-customBlue focus:outline-none"
                    placeholder="Email"
                    type="text"
                    />
                    <input
                    className="text-center border border-gray-300 rounded-md w-full h-12 focus:ring-2 focus:ring-customBlue focus:outline-none"
                    placeholder="Password"
                    type="password"
                    />
                </form>
                </div>

                <div className="mt-8 w-full max-w-sm flex justify-between">
                    <button className="bg-customBlue text-white text-sm font-semibold border border-customBlue rounded-md py-3 px-6 hover:bg-blue-700 transition-shadow drop-shadow-md">
                        Login
                    </button>
                    <button className="bg-transparent text-customBlue text-sm font-semibold border border-customBlue rounded-md py-3 px-6 hover:bg-customBlue hover:text-white transition-shadow drop-shadow-md">
                        Sign Up
                    </button>
                </div>
            </div>

            <div className="hidden md:flex flex-1 relative">
                <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                >
                <source src="/chart.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
                <div className="relative flex items-center justify-center h-full text-white">
                </div>
            </div>
        </div>
    )
};

export default LoginPage;