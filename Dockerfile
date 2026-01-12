# 使用官方 Node.js 镜像作为基础镜像
FROM node:20-alpine AS base

# 安装 Python 和 pip
RUN apk add --no-cache python3 py3-pip

# 安装 nbformat
RUN pip3 install nbformat --break-system-packages

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 5000

# 启动应用
CMD ["pnpm", "start"]
