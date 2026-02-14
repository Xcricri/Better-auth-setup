"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Page = () => {
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)
        setError(null)

        // SigIn logic
        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/user/dashboard"
        })

        if (error) {
            setError(error.message || "Failed to login");
            setLoading(false);
        }

        router.push("/user/dashboard");
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm space-y-4 rounded-lg border p-6 shadow"
                >
                    <h1 className="text-xl font-bold">Login</h1>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div>
                        <label className="block text-sm">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full rounded border p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full rounded border p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-black p-2 text-white"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </>
    )
};

export default Page;
