## Version Check

### 1. Node.js

```bash
node -v
```

**如果未安装：**

```bash
# 使用 Homebrew
brew install node

# 或使用 nvm（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

### 2. npm

```bash
npm -v
```

**如果未安装：**

```bash
# npm 通常随 Node.js 自动安装，如需单独安装
curl -L https://www.npmjs.com/install.sh | sh
```

### 3. yarn

```bash
yarn -v
```

**如果未安装：**

```bash
npm install -g yarn
```

## Installation

安装完所有基础环境后，开始安装 Ant Design Pro。

### Step 1: Install tyarn (Recommended)

**说明：** tyarn 是一个更快、更可靠的包管理器，特别适合中国用户使用。它使用淘宝 npm 镜像源，可以显著减少安装时间和失败率，同时完全兼容 npm。

```bash
npm install -g tyarn
```

### Step 2: Install Ant Design Pro CLI

**说明：** Ant Design Pro CLI 工具（`@ant-design/pro-cli`）是一个命令行工具，可以帮助你快速创建和初始化新的 Ant Design Pro 项目，包含预配置的模板和最佳实践。

```bash
npm i @ant-design/pro-cli -g
```

### Step 3: Create the Project

**说明：** 这个命令会创建一个新的 Ant Design Pro 项目。在创建过程中，系统会提示你：
- 选择 umi 版本（umi@4 或 umi@3）
- 选择模板（如果选择 umi@3：simple 基础模板 或 complete 完整模板）

```bash
pro create mall_system
```

> **注意：** `mall_system` 是本项目的项目名称。你可以替换为你自己的项目名称。

### Step 4: Enter the Project Folder

**说明：** 进入刚刚创建的项目目录。之后的所有命令都应该在这个目录中运行。

```bash
cd mall_system
```

### Step 5: Install Dependencies

**说明：** 安装 Ant Design Pro 项目所需的所有依赖包。这包括 React、Ant Design 组件、Umi 框架以及 `package.json` 中定义的所有其他必要的库。

**Using tyarn (recommended):**

```bash
tyarn
```

**Or using npm:**

```bash
npm install
```

## Development Commands

### npm run start

**说明：** 启动开发服务器，这是本地开发时最常用的命令。运行后会：
- 自动启动开发服务器
- 自动打开浏览器显示页面（通常是 http://localhost:8000）
- 当你修改代码后，页面会自动刷新
- 支持热更新，方便调试和开发

```bash
npm start
```

或使用 yarn：

```bash
yarn start
```

### npm run build

**说明：** 构建生产版本，用于部署到服务器。运行后会：
- 编译和优化代码
- 压缩文件，减小体积
- 生成生产环境可用的文件
- 所有编译后的文件会放在 `dist` 目录中
- **注意：** 如果只是本地开发不部署，不需要运行此命令

```bash
npm run build
```

或使用 yarn：

```bash
yarn build
```

### npm run analyze

**说明：** 分析打包文件的大小和组成。运行后会：
- 分析各个模块占用的空间
- 生成可视化的打包分析报告
- 帮助优化代码和减少打包体积
- **注意：** 本地开发时通常不需要使用

```bash
npm run analyze
```

或使用 yarn：

```bash
yarn analyze
```

### npm run lint

**说明：** 检查代码质量和规范。运行后会：
- 检查代码是否符合规范
- 发现潜在的代码问题
- 显示代码中的错误和警告
- **推荐：** 定期运行，保持代码质量

```bash
npm run lint
```

或使用 yarn：

```bash
yarn lint
```

### npm run lint:fix

**说明：** 自动修复代码问题。运行后会：
- 自动修复可以修复的代码问题
- 统一代码风格
- 保持代码规范一致
- **推荐：** 在提交代码前运行，确保代码质量

```bash
npm run lint:fix
```

或使用 yarn：

```bash
yarn lint:fix
```

### npm run i18n-remove

**说明：** 移除国际化（多语言）功能。运行后会：
- 移除项目中的国际化相关代码
- 简化项目结构
- **注意：** 如果项目需要多语言支持，不要运行此命令。本地开发时通常不需要使用

```bash
npm run i18n-remove
```

或使用 yarn：

```bash
yarn i18n-remove
```

## Summary

**本地开发时主要使用的命令：**
- `npm start` - 启动开发服务器（最常用）
- `npm run lint` / `npm run lint:fix` - 检查代码质量（推荐使用）

**部署时使用的命令：**
- `npm run build` - 构建生产版本

**其他命令：**
- `npm run analyze` - 分析打包（可选）
- `npm run i18n-remove` - 移除国际化（通常不需要）