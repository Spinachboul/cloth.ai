import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Generate unique filename
    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Return the public URL of the uploaded image
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      message: 'Upload successful', 
      imageUrl: publicUrl 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}