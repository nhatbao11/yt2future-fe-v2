import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and Password are required' }, { status: 400 });
        }

        // Call Backend API
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await backendRes.json();

        if (!backendRes.ok) {
            return NextResponse.json({ message: result.message || 'Login failed' }, { status: backendRes.status });
        }

        // Set Cookie
        const token = result.token;
        if (token) {
            const cookieStore = await cookies();
            cookieStore.set('yt2future_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60,
            });
            return NextResponse.json({ message: 'Login successful', token });
        } else {
            return NextResponse.json({ message: 'Backend did not return token' }, { status: 500 });
        }

    } catch (error: any) {
        console.error("Login API Error:", error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
