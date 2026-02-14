import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true },
        });
        return NextResponse.json(users);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function CREATE(request: Request) {
    try {
        const data = await request.json();
        const user = await prisma.user.create({
            data,
        });
        return NextResponse.json(user);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}