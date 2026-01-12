# GitHub 部署指南

本指南将帮助你将 Jupyter Notebook 转 Markdown 工具部署到 GitHub 并进行公网访问。

---

## 目录

1. [准备工作](#准备工作)
2. [创建 GitHub 仓库](#创建-github-仓库)
3. [推送代码到 GitHub](#推送代码到-github)
4. [部署到 Vercel](#部署到-vercel)
5. [配置自定义域名](#配置自定义域名-可选)
6. [添加 GitHub Actions](#添加-github-actions)
7. [搜索引擎优化](#搜索引擎优化-seo)

---

## 准备工作

### 1. 安装 Git

如果你还没有安装 Git，请先安装：

**Windows:**
- 下载：https://git-scm.com/download/win
- 安装并使用默认配置

**macOS:**
```bash
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install git
```

### 2. 注册 GitHub 账户

访问 https://github.com 注册账户

### 3. 配置 Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 创建 GitHub 仓库

### 方法一：通过 GitHub 网页创建

1. 登录 GitHub，点击右上角的 `+` 号，选择 `New repository`
2. 填写仓库信息：
   - **Repository name**: `ipynb-to-markdown`（或你喜欢的名字）
   - **Description**: `Jupyter Notebook to Markdown converter - 一个简单的在线转换工具`
   - **Public**: ✅ 选中（公开）
   - **Initialize this repository**: ❌ 不勾选（我们将从本地推送）
3. 点击 `Create repository`

### 方法二：使用 GitHub CLI（需要先安装）

```bash
gh repo create ipynb-to-markdown --public --source=. --description="Jupyter Notebook to Markdown converter"
```

---

## 推送代码到 GitHub

### 1. 初始化本地仓库

```bash
# 如果还没有初始化 Git 仓库
git init
```

### 2. 添加所有文件到暂存区

```bash
git add .
```

### 3. 创建初始提交

```bash
git commit -m "Initial commit: Add Jupyter Notebook to Markdown converter"
```

### 4. 关联远程仓库

```bash
git remote add origin https://github.com/xianianmian/ipynb-to-markdown.git
```

### 5. 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

如果遇到认证错误，需要配置 GitHub Token：

#### 配置 GitHub Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 `Generate new token` → `Generate new token (classic)`
3. 勾选权限：
   - ✅ `repo` (完整仓库访问权限)
   - ✅ `workflow` (GitHub Actions 权限)
4. 点击 `Generate token`，复制生成的 token
5. 使用 token 推送：

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/ipynb-to-markdown.git
git push -u origin main
```

---

## 部署到 Vercel

### 方法一：通过 Vercel 网页部署（推荐）

1. 访问 https://vercel.com/signup 并注册账户
2. 点击 `Add New` → `Project`
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测到 Next.js 项目，点击 `Import`
5. 配置构建选项：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
6. 点击 `Deploy`
7. 等待部署完成（约 1-2 分钟）
8. 部署成功后，你会获得一个免费的域名：
   - 格式：`https://your-project-name.vercel.app`

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel
```

按照提示操作，Vercel 会自动部署你的项目。

### Vercel 自动部署

每次你推送代码到 GitHub 主分支，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Add new feature"
git push
```

Vercel 会自动检测并部署最新代码。

---

## 配置自定义域名（可选）

### 在 Vercel 上配置域名

1. 在 Vercel 项目设置中，点击 `Domains`
2. 添加你的域名（如 `tools.yourdomain.com`）
3. 按照提示在域名服务商处添加 DNS 记录：
   - **类型**: CNAME
   - **主机记录**: `tools`（或你想要的子域名）
   - **记录值**: `cname.vercel-dns.com`
4. 等待 DNS 生效（通常 5-30 分钟）

### 免费域名方案

如果你没有自己的域名，可以使用以下免费服务：

- **Freenom**: https://www.freenom.com（.tk, .ml 等免费域名）
- **EU.org**: https://nic.eu.org（免费 .eu.org 域名）
- **No-IP**: https://www.noip.com（免费动态域名）

---

## 添加 GitHub Actions

项目已配置好 GitHub Actions CI/CD 工作流（`.github/workflows/ci.yml`），它会自动：

1. 运行代码检查
2. 执行类型检查
3. 构建项目
4. 测试 API

每次你推送代码或创建 Pull Request 时，Actions 会自动运行。

### 查看构建状态

在 GitHub 仓库页面，点击 `Actions` 标签查看所有工作流的运行状态。

---

## 搜索引擎优化（SEO）

### 1. 提交站点地图

#### 生成站点地图

创建 `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://your-domain.vercel.app/ipynb-converter',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
```

#### 生成 robots.txt

创建 `src/app/robots.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://your-domain.vercel.app/sitemap.xml',
  }
}
```

### 2. 提交到搜索引擎

#### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加你的域名
3. 验证域名所有权
4. 提交站点地图：`https://your-domain.vercel.app/sitemap.xml`

#### Bing Webmaster Tools

1. 访问 https://www.bing.com/webmasters
2. 添加你的域名
3. 验证域名所有权
4. 提交站点地图

#### 百度站长平台

1. 访问 https://ziyuan.baidu.com/
2. 添加你的域名
3. 验证域名所有权
4. 提交站点地图

### 3. 添加 Open Graph 标签

在 `src/app/layout.tsx` 中添加：

```typescript
export const metadata: Metadata = {
  title: 'Jupyter Notebook 转 Markdown 工具',
  description: '免费在线将 .ipynb 文件转换为 Markdown 格式',
  openGraph: {
    title: 'Jupyter Notebook 转 Markdown 工具',
    description: '免费在线将 .ipynb 文件转换为 Markdown 格式',
    type: 'website',
    url: 'https://your-domain.vercel.app',
  },
}
```

---

## 推广你的项目

### 1. 在社区分享

- **V2EX**: https://v2ex.com
- **掘金**: https://juejin.cn
- **知乎**: https://www.zhihu.com
- **Twitter/X**: 使用标签 `#JupyterNotebook #Markdown #DeveloperTools`

### 2. GitHub 自助推广

- 添加适当的标签（Topics）到仓库
- 完善项目的 README.md
- 提供清晰的截图和演示视频

### 3. 收集用户反馈

在 GitHub Issues 中创建以下模板：

1. **Feature Request** - 功能请求
2. **Bug Report** - Bug 报告
3. **Question** - 问题咨询

---

## 常见问题

### Q1: Vercel 部署失败怎么办？

**A:** 检查以下几点：
1. 确保代码推送到了 GitHub
2. 查看 Vercel 部署日志，找到具体错误
3. 检查 `package.json` 中的依赖是否正确
4. 确保 Python nbformat 已正确安装（Vercel 可能需要配置）

### Q2: 如何修改部署域名？

**A:** 在 Vercel 项目设置中：
1. 进入 `Settings` → `Domains`
2. 点击 `Edit` 修改域名
3. 保存并等待重新部署

### Q3: 每次部署需要手动操作吗？

**A:** 不需要。配置好 Vercel 后，每次推送代码到 GitHub 主分支，Vercel 会自动部署。

### Q4: 如何查看项目访问量？

**A:** Vercel 提供免费的访问统计：
1. 进入 Vercel 项目
2. 点击 `Analytics` 标签
3. 查看访问量、页面浏览量等数据

### Q5: 可以同时部署到多个平台吗？

**A:** 可以。你可以同时部署到：
- Vercel
- Railway
- Render
- Netlify

---

## 成本说明

### Vercel 免费套餐

- ✅ 100GB 带宽/月
- ✅ 无限项目部署
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 即时回滚
- ✅ GitHub 集成

### 个人项目完全免费！

对于个人项目或小流量项目，Vercel 免费套餐完全够用。

---

## 下一步

1. ✅ 完成仓库创建
2. ✅ 推送代码到 GitHub
3. ✅ 部署到 Vercel
4. ✅ 配置自定义域名（可选）
5. 🔄 添加更多功能
6. 🔄 收集用户反馈
7. 🔄 持续优化改进

---

## 联系与支持

如果你在部署过程中遇到问题：

- 查看 [GitHub Issues](https://github.com/YOUR_USERNAME/ipynb-to-markdown/issues)
- 参考 [Vercel 文档](https://vercel.com/docs)
- 参考 [Next.js 文档](https://nextjs.org/docs)

---

**祝你的开源项目大受欢迎！🎉**
