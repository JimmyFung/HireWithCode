# HireWithCode 项目 Vercel 部署完整指南

本指南将详细介绍如何将 HireWithCode 项目（包含 Vue + TypeScript 前端和 Node.js + TypeScript 后端）部署到 Vercel 平台。

## 目录

1. [项目概述](#项目概述)
2. [准备工作](#准备工作)
3. [后端部署](#后端部署)
4. [前端部署](#前端部署)
5. [环境变量配置](#环境变量配置)
6. [域名配置](#域名配置)
7. [常见问题解决](#常见问题解决)
8. [部署后测试](#部署后测试)

## 项目概述

HireWithCode 是一个面试挑战项目，包含以下技术栈：

**前端技术栈：**
- Vue 3 + TypeScript
- Vue Router（路由管理）
- Pinia（状态管理）
- 响应式设计（支持 PC 和移动端）

**后端技术栈：**
- Node.js + TypeScript
- Express.js 框架
- CORS 跨域支持
- 内存数据库（可扩展为真实数据库）

**项目结构：**
```
hirewithcode/
├── frontend/          # Vue + TypeScript 前端
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Node.js + TypeScript 后端
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
└── README.md
```




## 准备工作

在开始部署之前，请确保您已经完成以下准备工作：

### 1. 账户准备

**GitHub 账户：**
- 确保您有一个 GitHub 账户
- 将项目代码推送到 GitHub 仓库
- 建议仓库设置为公开（Public），便于 Vercel 访问

**Vercel 账户：**
- 访问 [Vercel 官网](https://vercel.com) 注册账户
- 推荐使用 GitHub 账户直接登录，这样可以简化后续的仓库连接过程
- 完成邮箱验证

### 2. 代码准备

**项目结构检查：**
确保您的项目结构如下所示：

```
your-repo/
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   ├── router/
│   │   ├── assets/
│   │   └── App.vue
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
└── README.md
```

**代码提交：**
```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: HireWithCode project"

# 添加远程仓库
git remote add origin https://github.com/your-username/your-repo-name.git

# 推送到 GitHub
git push -u origin main
```

### 3. 本地测试

在部署之前，强烈建议在本地环境中测试项目：

**测试后端：**
```bash
cd backend
npm install
npm run dev
```
访问 `http://localhost:3001/health` 确认后端正常运行。

**测试前端：**
```bash
cd frontend
npm install
npm run dev
```
访问 `http://localhost:5173` 确认前端正常运行。

**集成测试：**
确保前端可以正常调用后端 API，所有页面功能正常。


## 后端部署

由于 Vercel 主要针对前端和 Serverless 函数优化，我们需要将 Express 应用适配为 Serverless 函数。好消息是我们已经在项目中包含了 `vercel.json` 配置文件。

### 1. 后端部署步骤

**步骤 1：登录 Vercel**
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 使用 GitHub 账户登录

**步骤 2：导入项目**
1. 点击 "New Project" 按钮
2. 选择 "Import Git Repository"
3. 找到您的 GitHub 仓库并点击 "Import"

**步骤 3：配置后端部署**
1. 在项目导入页面，设置以下配置：
   - **Project Name**: `hirewithcode-backend`（或您喜欢的名称）
   - **Framework Preset**: 选择 "Other"
   - **Root Directory**: 设置为 `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

**步骤 4：环境变量设置**
在 "Environment Variables" 部分添加以下变量：
```
NODE_ENV=production
PORT=3001
```

**步骤 5：部署**
1. 点击 "Deploy" 按钮
2. 等待部署完成（通常需要 2-5 分钟）
3. 部署成功后，您会获得一个类似 `https://your-backend.vercel.app` 的 URL

### 2. 验证后端部署

部署完成后，请验证以下端点：

**健康检查：**
```
GET https://your-backend.vercel.app/health
```
应该返回：
```json
{
  "success": true,
  "message": "HireWithCode API Server is running",
  "data": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.456,
    "environment": "production"
  }
}
```

**API 文档：**
```
GET https://your-backend.vercel.app/
```
应该返回 API 端点列表。

### 3. 后端配置文件说明

**vercel.json 配置：**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

这个配置文件告诉 Vercel：
- 使用 `@vercel/node` 构建器处理 TypeScript 文件
- 将所有请求路由到主入口文件
- 设置生产环境变量

### 4. 后端部署注意事项

**CORS 配置：**
我们的后端已经配置了 CORS 允许所有来源：
```typescript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**数据持久化：**
当前使用内存数据库，数据在每次部署后会重置。生产环境建议使用：
- Vercel KV（Redis）
- PlanetScale（MySQL）
- Supabase（PostgreSQL）
- MongoDB Atlas

**性能优化：**
- Vercel Serverless 函数有冷启动时间
- 建议添加健康检查端点保持函数活跃
- 考虑使用 Vercel Edge Functions 提升性能


## 前端部署

前端部署相对简单，因为 Vercel 对 Vue.js 项目有很好的支持。

### 1. 前端部署步骤

**步骤 1：创建新项目**
1. 在 Vercel Dashboard 中点击 "New Project"
2. 再次选择您的 GitHub 仓库（或创建新的导入）

**步骤 2：配置前端部署**
1. 设置以下配置：
   - **Project Name**: `hirewithcode-frontend`
   - **Framework Preset**: 选择 "Vue.js"
   - **Root Directory**: 设置为 `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

**步骤 3：环境变量配置**
在 "Environment Variables" 部分添加：
```
VITE_API_BASE_URL=https://your-backend.vercel.app
```
将 `your-backend.vercel.app` 替换为您实际的后端域名。

**步骤 4：部署**
1. 点击 "Deploy" 按钮
2. 等待构建和部署完成
3. 获得前端访问 URL，如 `https://your-frontend.vercel.app`

### 2. 前端代码调整

为了让前端正确连接到后端，需要修改 API 调用配置：

**创建 API 配置文件：**
在 `frontend/src/utils/api.ts` 中：
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const apiClient = {
  baseURL: API_BASE_URL,
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return response.json();
  }
};
```

**更新组件中的 API 调用：**
在 `AcceptChallengeView.vue` 中：
```typescript
import { apiClient } from '../utils/api';

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    const response = await apiClient.post('/api/challenge/accept', formData);
    
    if (response.success) {
      router.push('/submit');
    } else {
      alert(response.message || '提交失败，请重试');
    }
  } catch (error) {
    console.error('提交失败:', error);
    alert('提交失败，请重试');
  } finally {
    isSubmitting.value = false;
  }
};
```

在 `SubmitChallengeView.vue` 中：
```typescript
import { apiClient } from '../utils/api';

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    const response = await apiClient.post('/api/challenge/submit', formData);
    
    if (response.success) {
      showSuccess.value = true;
      setTimeout(() => {
        formData.repoUrl = '';
        formData.vercelUrl = '';
        showSuccess.value = false;
      }, 3000);
    } else {
      alert(response.message || '提交失败，请重试');
    }
  } catch (error) {
    console.error('提交失败:', error);
    alert('提交失败，请重试');
  } finally {
    isSubmitting.value = false;
  }
};
```

### 3. Vite 配置优化

在 `frontend/vite.config.ts` 中添加生产环境优化：
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

### 4. 前端部署验证

部署完成后，请验证以下功能：

1. **页面加载：** 访问前端 URL，确认所有页面正常加载
2. **路由功能：** 测试页面间的跳转
3. **API 连接：** 测试表单提交功能
4. **响应式设计：** 在不同设备上测试界面适配
5. **性能检查：** 使用浏览器开发者工具检查加载速度

### 5. 自动部署配置

Vercel 支持 Git 集成，每次推送代码到 GitHub 都会自动触发部署：

**配置自动部署：**
1. 在 Vercel 项目设置中，确保 "Git Integration" 已启用
2. 设置部署分支（通常是 `main` 或 `master`）
3. 配置部署钩子（可选）

**部署预览：**
- 每个 Pull Request 都会创建预览部署
- 可以在合并前测试更改
- 预览 URL 会自动添加到 PR 评论中


## 环境变量配置

正确的环境变量配置是部署成功的关键。以下是详细的配置指南：

### 1. 后端环境变量

在 Vercel 后端项目的 "Settings" → "Environment Variables" 中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NODE_ENV` | `production` | 运行环境 |
| `PORT` | `3001` | 服务端口（可选） |
| `CORS_ORIGIN` | `https://your-frontend.vercel.app` | 允许的前端域名 |

### 2. 前端环境变量

在 Vercel 前端项目的环境变量中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app` | 后端 API 地址 |
| `VITE_APP_TITLE` | `HireWithCode` | 应用标题 |

### 3. 环境变量最佳实践

**安全性：**
- 敏感信息（如数据库密码、API 密钥）应该设置为 "Secret"
- 不要在代码中硬编码敏感信息
- 使用 `.env.example` 文件记录所需的环境变量

**管理：**
- 为不同环境（开发、预览、生产）设置不同的变量值
- 使用描述性的变量名
- 定期审查和更新环境变量

## 域名配置

### 1. 自定义域名设置

如果您有自己的域名，可以将其连接到 Vercel 项目：

**步骤 1：添加域名**
1. 在 Vercel 项目设置中，点击 "Domains"
2. 输入您的域名（如 `hirewithcode.com`）
3. 点击 "Add"

**步骤 2：配置 DNS**
根据 Vercel 提供的说明配置您的 DNS 记录：
- **A 记录：** 指向 Vercel 的 IP 地址
- **CNAME 记录：** 指向 `cname.vercel-dns.com`

**步骤 3：SSL 证书**
Vercel 会自动为您的域名提供免费的 SSL 证书。

### 2. 子域名配置

建议使用子域名分别部署前端和后端：
- 前端：`https://app.yourdomain.com`
- 后端：`https://api.yourdomain.com`

## 常见问题解决

### 1. 部署失败问题

**问题：构建失败**
```
Error: Cannot find module 'typescript'
```
**解决方案：**
确保 `package.json` 中包含所有必要的依赖：
```bash
npm install --save-dev typescript @types/node
```

**问题：路由 404 错误**
**解决方案：**
在前端项目根目录创建 `vercel.json`：
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 2. API 连接问题

**问题：CORS 错误**
```
Access to fetch at 'https://api.example.com' from origin 'https://app.example.com' has been blocked by CORS policy
```
**解决方案：**
检查后端 CORS 配置，确保允许前端域名：
```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

**问题：API 请求超时**
**解决方案：**
Vercel Serverless 函数有 10 秒执行限制，优化代码性能或考虑使用 Edge Functions。

### 3. 性能问题

**问题：首次加载慢**
**解决方案：**
- 启用 Vercel Analytics 监控性能
- 使用代码分割减少包大小
- 配置 CDN 缓存策略

**问题：冷启动延迟**
**解决方案：**
- 使用 Vercel Cron Jobs 定期调用 API 保持活跃
- 考虑升级到 Pro 计划获得更好的性能

### 4. 调试技巧

**查看部署日志：**
1. 在 Vercel Dashboard 中点击项目
2. 选择 "Functions" 或 "Deployments"
3. 查看详细的构建和运行日志

**本地调试：**
```bash
# 安装 Vercel CLI
npm i -g vercel

# 本地运行 Vercel 环境
vercel dev
```

**环境变量调试：**
在代码中添加日志输出：
```typescript
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.VITE_API_BASE_URL);
```


## 部署后测试

部署完成后，进行全面的功能测试确保应用正常运行：

### 1. 功能测试清单

**基础功能测试：**
- [ ] 欢迎页面正常显示，2秒后自动跳转
- [ ] 面试引导页面 Markdown 内容正确渲染
- [ ] 接受挑战表单可以正常提交
- [ ] 提交挑战表单可以正常提交
- [ ] 页面间路由跳转正常

**API 测试：**
- [ ] 后端健康检查接口响应正常
- [ ] 接受挑战 API 正常工作
- [ ] 提交挑战 API 正常工作
- [ ] 错误处理和验证正常

**跨设备测试：**
- [ ] 桌面端显示正常
- [ ] 移动端响应式布局正常
- [ ] 不同浏览器兼容性良好

### 2. 性能测试

**使用工具：**
- Google PageSpeed Insights
- Vercel Analytics
- 浏览器开发者工具

**关键指标：**
- First Contentful Paint (FCP) < 2s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms

### 3. 安全测试

**检查项目：**
- HTTPS 证书正常
- CORS 配置正确
- 输入验证有效
- 错误信息不泄露敏感信息

## 持续集成和部署

### 1. 自动化工作流

**GitHub Actions 配置：**
在项目根目录创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies (Frontend)
      run: |
        cd frontend
        npm ci
        
    - name: Install dependencies (Backend)
      run: |
        cd backend
        npm ci
        
    - name: Run tests
      run: |
        cd frontend && npm run test
        cd ../backend && npm run test
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. 版本管理

**语义化版本：**
使用 `npm version` 管理版本：
```bash
npm version patch  # 修复版本
npm version minor  # 功能版本
npm version major  # 重大版本
```

**发布流程：**
1. 开发功能分支
2. 创建 Pull Request
3. 代码审查
4. 合并到主分支
5. 自动部署到生产环境

## 监控和维护

### 1. 应用监控

**Vercel Analytics：**
- 启用 Vercel Analytics 监控访问量
- 查看性能指标和用户行为
- 设置告警通知

**错误监控：**
集成 Sentry 或其他错误监控服务：
```bash
npm install @sentry/vue @sentry/node
```

### 2. 日志管理

**结构化日志：**
```typescript
const logger = {
  info: (message: string, data?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      data,
      timestamp: new Date().toISOString()
    }));
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message || error,
      timestamp: new Date().toISOString()
    }));
  }
};
```

### 3. 备份和恢复

**数据备份：**
如果使用外部数据库，定期备份数据：
- 自动化备份脚本
- 多地域备份存储
- 定期恢复测试

## 扩展和优化

### 1. 数据库集成

**推荐数据库服务：**
- **Vercel KV：** Redis 兼容的键值存储
- **PlanetScale：** 无服务器 MySQL 平台
- **Supabase：** 开源 Firebase 替代品
- **MongoDB Atlas：** 云端 MongoDB 服务

**Supabase 集成示例：**
```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 2. 认证系统

**集成认证服务：**
- Vercel Auth
- Auth0
- Firebase Auth
- Supabase Auth

### 3. 缓存策略

**CDN 缓存：**
```typescript
// vercel.json 中配置缓存
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

## 总结

通过本指南，您应该能够成功将 HireWithCode 项目部署到 Vercel 平台。关键要点包括：

1. **项目结构：** 合理的前后端分离架构
2. **配置文件：** 正确的 `vercel.json` 和环境变量配置
3. **API 集成：** 前后端正确的 API 连接
4. **性能优化：** 代码分割、缓存策略等
5. **监控维护：** 持续的性能监控和错误追踪

**下一步建议：**
- 集成真实数据库替代内存存储
- 添加用户认证和授权
- 实现更丰富的数据分析功能
- 优化 SEO 和社交媒体分享
- 添加国际化支持

**有用的资源：**
- [Vercel 官方文档](https://vercel.com/docs)
- [Vue.js 官方文档](https://vuejs.org/)
- [Express.js 官方文档](https://expressjs.com/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

祝您部署顺利！如果遇到问题，可以查看 Vercel 的部署日志或联系技术支持。

