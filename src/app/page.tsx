import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "扣子编程 - AI 开发伙伴",
  description: "扣子编程，你的 AI 开发伙伴已就位",
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
      {/* 主容器 */}
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 sm:items-start">
        {/* 头部：Logo 和 产品名称 */}
        <div className="flex items-center gap-3">
          {/* 注意：生产环境建议使用 next/image 并配置 remotePatterns */}
          <img
            className="dark:invert"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/hkpzboz/coze_logo.png"
            alt="扣子编程 Logo"
            width={40}
            height={40}
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
          <span className="text-xl font-bold tracking-tight text-black dark:text-zinc-50">
            扣子编程
          </span>
        </div>

        {/* 中间内容区：主标题和副标题 */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            Jupyter Notebook 转 Markdown 工具
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            快速将 .ipynb 文件转换为 Markdown 格式，支持本地文件上传和远程 URL。
            <br />
            转换后的文件包含完整的代码块、Markdown 文本和输出结果，可直接下载使用。
          </p>
        </div>

        {/* 底部按钮区 */}
        <div className="flex w-full flex-col gap-4 text-base font-medium sm:w-auto sm:flex-row">
          {/* 按钮 1：ipynb 转 Markdown */}
          <a
            className="flex h-12 w-full min-w-[160px] items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:w-auto"
            href="/ipynb-converter"
          >
            ipynb 转 Markdown
          </a>

          {/* 按钮 2：前往首页 */}
          <a
            className="flex h-12 w-full min-w-[160px] items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-auto"
            href="https://code.coze.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            前往首页
          </a>

          {/* 按钮 3：查看文档 */}
          <a
            className="flex h-12 w-full min-w-[160px] items-center justify-center rounded-full border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-auto"
            href="https://docs.coze.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看文档
          </a>
        </div>
      </main>
    </div>
  );
}