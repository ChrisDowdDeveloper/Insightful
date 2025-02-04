"use client"
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { verifyLogin, login as apiLogin, logout as apiLogout } from "@/api/api";

interface User {
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const verifiedUser = await verifyLogin();
                setUser(verifiedUser);
            } catch (error) {
                console.error("Error verifying login:", error);
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = async (email: string, password: string): Promise<void> => {
        try {
            await apiLogin(email, password);
            const verifiedUser = await verifyLogin();
            setUser(verifiedUser);
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const handleLogout = async (): Promise<void> => {
        await apiLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
