import { NextRequest, NextResponse } from 'next/server'
import { readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const TEMP_DIR = '/tmp/ipynb-converter'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      )
    }

    const filepath = path.join(TEMP_DIR, `${fileId}.md`)

    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: 'File not found or expired' },
        { status: 404 }
      )
    }

    // 读取文件内容
    const fileContent = await readFile(filepath, 'utf-8')

    // 设置响应头，提供文件下载
    const response = new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileId}.md"`,
      },
    })

    // 延迟删除文件（在发送后）
    setTimeout(async () => {
      try {
        await unlink(filepath)
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }, 1000)

    return response
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Download failed',
      },
      { status: 500 }
    )
  }
}
