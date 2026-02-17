import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/authService';

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password, confirmPassword } = await req.json();

        // 1. Validate
        if (password !== confirmPassword) {
            return NextResponse.json({ message: 'Mật khẩu xác nhận không khớp sếp ơi!' }, { status: 400 });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json({ message: 'Mật khẩu cần 8 ký tự, có chữ hoa, chữ thường và số.' }, { status: 400 });
        }

        // 2. Call Service
        await authService.register({ fullName, email, password });

        return NextResponse.json({ message: 'Đăng ký thành công!' });

    } catch (error: any) {
        console.error("Signup API Error:", error);
        return NextResponse.json({ message: error.message || 'Đăng ký thất bại' }, { status: 500 });
    }
}
