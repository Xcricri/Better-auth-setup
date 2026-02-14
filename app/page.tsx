"use client";

import { useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <>
            <main className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Count</h1>
                <p className="text-2xl font-bold">{count}</p>

                <div className="flex gap-2">
                    <button
                        className="mt-4 px-4 py-2 btn btn-primary"
                        onClick={() => setCount(count + 1)}
                    >
                        Tambah
                    </button>
                    <button
                        className="mt-4 px-4 py-2 btn btn-secondary"
                        onClick={() => setCount(0)}
                    >
                        Reset
                    </button>
                    <button
                        className="mt-4 px-4 py-2 btn btn-warning"
                        onClick={() => setCount(count - 1)}
                    >
                        Kurang
                    </button>
                </div>
            </main>
        </>
    );
}
