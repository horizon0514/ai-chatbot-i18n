import { NextResponse } from 'next/server';
import { z } from 'zod';
import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@/app/(auth)/auth';

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: '文件大小应小于5MB',
    })
    // Update the file type based on the kind of files you want to accept
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
      message: '文件类型应为JPEG或PNG',
    }),
});

// 确保上传目录存在
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// 生成唯一的文件名
function generateUniqueFileName(originalName: string) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const ext = path.extname(originalName);
  return `${timestamp}-${random}${ext}`;
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (request.body === null) {
    return new Response('Request body is empty', { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(', ');

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // 获取原始文件名并生成唯一文件名
    const originalFilename = (formData.get('file') as File).name;
    const uniqueFilename = generateUniqueFileName(originalFilename);
    
    // 构建完整的文件路径
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);
    
    // 将文件内容转换为Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // 写入文件
    await writeFile(filePath, fileBuffer);

    // 返回文件的URL路径
    const fileUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      url: fileUrl,
      pathname: uniqueFilename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}
