import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSiteData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const providerOverride = formData.get('provider') as string | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const data = getSiteData();
    const activeProvider = providerOverride || data.storage?.activeSource || data.storage?.provider || 'local';

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary configured and selected
    if (activeProvider === 'cloudinary' && data.storage?.cloudName && data.storage?.uploadPreset) {
      try {
        const uploadForm = new FormData();
        uploadForm.append('file', file);
        uploadForm.append('upload_preset', data.storage.uploadPreset);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${data.storage.cloudName}/auto/upload`, {
          method: 'POST',
          body: uploadForm
        });
        const resData = await res.json();
        if (resData.secure_url) {
          return NextResponse.json({
            success: true,
            provider: 'cloudinary',
            url: resData.secure_url,
            name: file.name,
            size: file.size,
            type: file.type
          });
        }
      } catch (err) {
        console.warn('Cloudinary upload failed, falling back to local/inline:', err);
      }
    }

    // Local file write with serverless base64 fallback
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${cleanName}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);
      const fileUrl = `/uploads/${filename}`;

      return NextResponse.json({
        success: true,
        provider: 'local',
        url: fileUrl,
        name: file.name,
        size: file.size,
        type: file.type
      });
    } catch (writeErr) {
      // In read-only serverless environment (e.g. Vercel), return base64 Data URL
      const base64 = buffer.toString('base64');
      const mimeType = file.type || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return NextResponse.json({
        success: true,
        provider: 'inline-data',
        url: dataUrl,
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
