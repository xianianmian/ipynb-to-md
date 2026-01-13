import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const TEMP_DIR = '/tmp/ipynb-converter'

// 确保临时目录存在
async function ensureTempDir() {
  if (!existsSync(TEMP_DIR)) {
    await execAsync(`mkdir -p ${TEMP_DIR}`)
  }
}

// 生成唯一文件 ID
function generateFileId(): string {
  return crypto.randomBytes(16).toString('hex')
}

// 下载远程文件
async function downloadFile(url: string, filepath: string): Promise<void> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  await writeFile(filepath, buffer)
}

// 转换 .ipynb 为 Markdown
async function convertToMarkdown(ipynbPath: string, outputPath: string): Promise<void> {
  const scriptPath = path.join(process.cwd(), 'src', 'app', 'api', 'ipynb', 'convert.py')

  try {
    // 尝试使用 jupyter nbconvert 命令
    await execAsync(`jupyter nbconvert --to markdown --output "${outputPath}" "${ipynbPath}"`)
  } catch (error) {
    // 如果 jupyter 命令不可用，使用 Python 脚本
    try {
      await execAsync(`python3 "${scriptPath}" "${ipynbPath}" "${outputPath}"`)
    } catch (pythonError) {
      throw new Error(
        `Failed to convert file. Error: ${pythonError instanceof Error ? pythonError.message : String(pythonError)}`
      )
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTempDir()

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const url = formData.get('url') as string | null

    if (!file && !url) {
      return NextResponse.json(
        { error: 'Please provide either a file or a URL' },
        { status: 400 }
      )
    }

    const fileId = generateFileId()
    let ipynbPath: string
    let filename: string

    if (file) {
      // 处理上传的文件
      if (!file.name.endsWith('.ipynb')) {
        return NextResponse.json(
          { error: 'File must be a .ipynb file' },
          { status: 400 }
        )
      }

      filename = file.name.replace('.ipynb', '') + '.md'
      ipynbPath = path.join(TEMP_DIR, `${fileId}.ipynb`)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await writeFile(ipynbPath, buffer)
    } else if (url) {
      // 处理远程 URL
      if (!url.endsWith('.ipynb')) {
        return NextResponse.json(
          { error: 'URL must point to a .ipynb file' },
          { status: 400 }
        )
      }

      filename = url.split('/').pop()?.replace('.ipynb', '') + '.md' || 'converted.md'
      ipynbPath = path.join(TEMP_DIR, `${fileId}.ipynb`)

      await downloadFile(url, ipynbPath)
    } else {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // 转换为 Markdown
    const outputPath = path.join(TEMP_DIR, `${fileId}.md`)
    await convertToMarkdown(ipynbPath, outputPath)

    // 检查转换结果
    if (!existsSync(outputPath)) {
      throw new Error('Conversion failed - output file not created')
    }

    // 清理原始 .ipynb 文件
    await unlink(ipynbPath).catch(() => {})

    return NextResponse.json({
      success: true,
      filename: filename,
      fileId: fileId,
      message: 'Conversion successful',
    })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Conversion failed',
      },
      { status: 500 }
    )
  }
}
