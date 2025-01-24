"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [userNameOrEmail, setUserNameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <div>
            <h1>Welcome to Insightful</h1>
            <p>Login to save data!</p>
            <a href="/dashboard">Click here to try it out.</a>
        </div>
    )
};

export default LoginPage;