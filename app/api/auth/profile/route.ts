import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';

export async function PUT(req: NextRequest) {
    try {
        // 1. Config Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

        const cookieStore = await cookies();
        const token = cookieStore.get('yt2future_token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const fullName = formData.get('fullName') as string;
        const file = formData.get('avatarFile') as File;
        let avatarUrl = formData.get('currentAvatarUrl') as string;

        // 2. Upload Cloudinary if file exists
        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            try {
                const uploadResult: any = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'avatars',
                            upload_preset: 'yt2future',
                        },
                        (error, result) => (error ? reject(error) : resolve(result))
                    );
                    stream.end(buffer);
                });
                avatarUrl = uploadResult.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
            }
        }

        // 3. Call Backend API
        const LOCAL_BACKEND_URL = process.env.LOCAL_API_URL || 'http://localhost:5000/api';
        const backendRes = await fetch(`${LOCAL_BACKEND_URL}/auth/update-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `yt2future_token=${token}`
            },
            body: JSON.stringify({ fullName, avatarUrl }),
        });

        if (!backendRes.ok) {
            const errorData = await backendRes.json();
            return NextResponse.json({ message: errorData.message || 'Update failed' }, { status: backendRes.status });
        }

        return NextResponse.json({ message: 'Update successful', avatarUrl });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
