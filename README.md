# Jupyter Notebook 转 Markdown 工具

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**一个简单易用的 Jupyter Notebook 转 Markdown 在线工具**

[功能特性](#功能特性) • [快速开始](#快速开始) • [使用方法](#使用方法) • [部署指南](#部署指南)

</div>

---

## 功能特性

- 📁 **多种输入方式**
  - 本地文件上传（支持拖拽）
  - 远程 URL 直接转换
- 🔄 **即时转换**
  - 基于 Python nbformat 的高效转换
  - 保留完整格式：代码块、Markdown、输出结果
- 💾 **一键下载**
  - 转换完成后直接下载 Markdown 文件
- 🎨 **现代化 UI**
  - 响应式设计，支持深色模式
  - 友好的用户交互体验
- 🔒 **隐私保护**
  - 服务器端处理，数据安全
  - 临时文件自动清理

## 技术栈

### 前端
- **Next.js 16** - React 框架
- **React 19** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架

### 后端
- **Next.js API Routes** - 服务端 API
- **Python nbformat** - Notebook 解析库
- **Node.js fs** - 文件系统操作

---

## 快速开始

### 环境要求

- Node.js 18+
- Python 3.8+
- pnpm（推荐）或 npm

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/ipynb-to-markdown.git
cd ipynb-to-markdown
```

2. **安装依赖**
```bash
pnpm install
```

3. **安装 Python 依赖**
```bash
pip install nbformat
```

4. **启动开发服务器**
```bash
pnpm dev
```

5. **访问应用**

打开浏览器访问 `http://localhost:5000`

---

## 使用方法

### 方式一：本地文件转换

1. 访问 `http://localhost:5000` 或 `http://localhost:5000/ipynb-converter`
2. 点击上传区域选择 `.ipynb` 文件，或直接拖拽文件到上传区域
3. 点击"开始转换"按钮
4. 等待转换完成后，点击"下载 Markdown 文件"

### 方式二：远程 URL 转换

1. 在远程 URL 输入框中输入 `.ipynb` 文件的完整 URL
2. 点击"开始转换"按钮
3. 等待转换完成后，点击"下载 Markdown 文件"

---

## 项目结构

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 首页
│   │   ├── ipynb-converter/
│   │   │   └── page.tsx                # 转换工具页面
│   │   ├── api/
│   │   │   └── ipynb/
│   │   │       ├── convert/
│   │   │       │   └── route.ts       # 转换 API
│   │   │       ├── convert.py         # Python 转换脚本
│   │   │       └── download/
│   │   │           └── [fileId]/
│   │   │               └── route.ts   # 下载 API
│   │   ├── layout.tsx
│   │   └── globals.css
├── public/                             # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## API 接口

### POST /api/ipynb/convert

转换 Jupyter Notebook 文件为 Markdown

**请求参数：**
- `file` (FormData) - 本地上传的 .ipynb 文件
- `url` (FormData) - 远程文件 URL

**响应示例：**
```json
{
  "success": true,
  "filename": "notebook.md",
  "fileId": "abc123...",
  "message": "Conversion successful"
}
```

### GET /api/ipynb/download/[fileId]

下载转换后的 Markdown 文件

**响应：**
- Content-Type: `text/markdown`
- 文件以附件形式下载

---

## 部署指南

### Vercel 部署（推荐）

1. [Fork 本项目](https://github.com/your-username/ipynb-to-markdown/fork)
2. 在 [Vercel](https://vercel.com) 导入你的 GitHub 仓库
3. 确认构建配置，点击 Deploy
4. 部署完成后，访问 Vercel 提供的域名

### Railway 部署

1. 在 [Railway](https://railway.app) 创建新项目
2. 导入 GitHub 仓库
3. 添加环境变量（如有需要）
4. Railway 会自动检测 Next.js 并部署

### Docker 部署

```bash
# 构建镜像
docker build -t ipynb-converter .

# 运行容器
docker run -p 5000:5000 ipynb-converter
```

---

## 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 常见问题

### Q: 支持哪些 Notebook 格式？
A: 支持标准的 Jupyter Notebook 格式（.ipynb），版本 4.x 及以上。

### Q: 转换后的文件在哪里保存？
A: 文件保存在服务器的临时目录中，下载后自动清理，不会长期存储。

### Q: 可以处理多大的文件？
A: 默认支持 50MB 以内的文件。如需支持更大文件，请修改 API 路由配置。

### Q: 是否支持其他格式？
A: 当前仅支持 .ipynb 转 Markdown，未来计划支持 PDF、HTML 等格式。

---

## 许可证

本项目采用 [MIT 许可证](LICENSE) - 详见 LICENSE 文件

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/ipynb-to-markdown&type=Date)](https://star-history.com/#your-username/ipynb-to-markdown&Date)

---

## 联系方式

- 项目主页: [https://github.com/xianianmian/ipynb-to-markdown](https://github.com/xianianmian/ipynb-to-markdown)
- 问题反馈: [Issues](https://github.com/xianianmian/ipynb-to-markdown/issues)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by [xianianmian](https://github.com/xianianmian)

</div>
