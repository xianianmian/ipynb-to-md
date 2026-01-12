# 贡献指南

感谢你有兴趣为 Jupyter Notebook 转 Markdown 工具做出贡献！

---

## 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 在 [Issues](https://github.com/YOUR_USERNAME/ipynb-to-markdown/issues) 中搜索是否已有人报告
2. 如果没有，创建新的 Issue，包含：
   - 清晰的标题
   - 详细的问题描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 截图或错误信息（如有）
   - 环境信息（操作系统、浏览器版本等）

### 提出功能建议

如果你有新的功能想法：

1. 在 [Issues](https://github.com/YOUR_USERNAME/ipynb-to-markdown/issues) 中提出
2. 描述功能的使用场景和价值
3. 提供可能的实现思路（如有）

### 提交代码

#### 1. Fork 项目

点击 GitHub 仓库右上角的 `Fork` 按钮

#### 2. 克隆你的 Fork

```bash
git clone https://github.com/YOUR_USERNAME/ipynb-to-markdown.git
cd ipynb-to-markdown
```

#### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

#### 4. 进行修改

- 遵循现有代码风格
- 添加必要的注释
- 更新相关文档
- 确保所有测试通过

#### 5. 提交代码

```bash
git add .
git commit -m "feat: add new feature"
# 或
git commit -m "fix: resolve bug in conversion"
```

**提交信息规范：**

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

#### 6. 推送到你的 Fork

```bash
git push origin feature/your-feature-name
```

#### 7. 创建 Pull Request

1. 访问你的 Fork 仓库
2. 点击 `Contribute` → `Open pull request`
3. 填写 PR 信息：
   - 清晰的标题
   - 详细的变更说明
   - 关联相关 Issue（如有）
4. 提交 PR

### 代码审查

提交 PR 后，维护者会进行代码审查。请：

- 及时回应 review 意见
- 根据反馈进行修改
- 保持友好的沟通态度

---

## 开发环境设置

### 安装依赖

```bash
pnpm install
```

### 安装 Python 依赖

```bash
pip install nbformat
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5000

### 运行测试

```bash
# 类型检查
pnpm tsc --noEmit

# 代码检查
pnpm lint

# 构建
pnpm build
```

---

## 项目结构

```
src/
├── app/
│   ├── page.tsx                    # 首页
│   ├── ipynb-converter/
│   │   └── page.tsx                # 转换器页面
│   ├── api/
│   │   └── ipynb/
│   │       ├── convert/route.ts    # 转换 API
│   │       └── download/[fileId]/route.ts  # 下载 API
│   ├── layout.tsx
│   └── globals.css
```

---

## 编码规范

### TypeScript

- 使用 TypeScript 类型定义
- 避免使用 `any` 类型
- 使用接口定义数据结构

### React/Next.js

- 使用函数组件
- 使用 Hooks 管理状态
- 遵循 Next.js App Router 规范

### 样式

- 使用 Tailwind CSS
- 保持样式一致性
- 响应式设计

### 命名规范

- 组件：PascalCase（如 `ConverterPage`）
- 函数/变量：camelCase（如 `convertFile`）
- 常量：UPPER_SNAKE_CASE（如 `MAX_FILE_SIZE`）

---

## 测试指南

### 手动测试

1. 上传本地 .ipynb 文件
2. 输入远程 URL
3. 测试下载功能
4. 检查转换结果格式

### 测试用例

建议测试以下场景：
- 大文件转换
- 包含图片的 Notebook
- 包含输出结果的代码单元
- 空文件
- 非 .ipynb 文件

---

## 文档贡献

文档同样重要！你可以：

- 修正错别字
- 添加使用示例
- 翻译文档
- 添加截图和图表
- 完善注释

---

## 行为准则

### 友善包容

- 尊重所有贡献者
- 欢迎新手参与
- 保持耐心和礼貌

### 建设性反馈

- 提出具体、可操作的建议
- 避免人身攻击
- 关注代码而非个人

---

## 获取帮助

如果你在贡献过程中遇到问题：

- 查看 [Issues](https://github.com/YOUR_USERNAME/ipynb-to-markdown/issues)
- 阅读 [文档](https://github.com/YOUR_USERNAME/ipynb-to-markdown/blob/main/README.md)
- 查看 [Next.js 文档](https://nextjs.org/docs)

---

感谢你的贡献！🎉
