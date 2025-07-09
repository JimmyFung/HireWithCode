# HireWithCode - 面试者挑战项目

这是一个完整的 Vue + TypeScript 前端和 Node.js + TypeScript 后端项目，实现了面试挑战的完整流程。

## 项目结构

```
hirewithcode/
├── frontend/          # Vue + TypeScript 前端
│   ├── src/
│   │   ├── views/     # 页面组件
│   │   ├── router/    # 路由配置
│   │   ├── utils/     # 工具函数
│   │   └── assets/    # 静态资源
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json
├── backend/           # Node.js + TypeScript 后端
│   ├── src/
│   │   ├── routes/    # API 路由
│   │   ├── middleware/# 中间件
│   │   ├── types/     # 类型定义
│   │   └── utils/     # 工具函数
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
├── VERCEL_DEPLOYMENT_GUIDE.md  # 详细部署指南
└── README.md
```

## 功能特性

### 前端功能
- ✅ 欢迎页面（Logo + 欢迎语，2秒自动跳转）
- ✅ 面试引导页面（Markdown 内容渲染）
- ✅ 接受挑战表单（GitHub ID + 邮箱）
- ✅ 提交挑战表单（仓库 URL + Vercel 地址）
- ✅ 响应式设计（PC + 移动端兼容）
- ✅ 路由管理和页面跳转
- ✅ 表单验证和错误处理

### 后端功能
- ✅ RESTful API 设计
- ✅ TypeScript 类型安全
- ✅ 数据验证中间件
- ✅ CORS 跨域支持
- ✅ 错误处理和日志
- ✅ 健康检查接口
- ✅ 内存数据库（可扩展）

## 快速开始

### 本地开发

**启动后端：**
```bash
cd backend
npm install
npm run dev
```
后端将在 http://localhost:3001 启动

**启动前端：**
```bash
cd frontend
npm install
npm run dev
```
前端将在 http://localhost:5173 启动

### 生产部署

详细的 Vercel 部署指南请查看：[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

## API 接口

### 接受挑战
```
POST /api/challenge/accept
Content-Type: application/json

{
  "githubId": "your-github-username",
  "email": "your-email@example.com"
}
```

### 提交挑战
```
POST /api/challenge/submit
Content-Type: application/json

{
  "repoUrl": "https://github.com/username/repository",
  "vercelUrl": "https://your-project.vercel.app"
}
```

### 健康检查
```
GET /health
```

## 技术栈

**前端：**
- Vue 3 + Composition API
- TypeScript
- Vue Router
- Pinia
- Vite

**后端：**
- Node.js
- Express.js
- TypeScript
- CORS
- Helmet

**部署：**
- Vercel (前端 + 后端)
- GitHub (代码托管)

## 开发规范

- 使用 TypeScript 确保类型安全
- 遵循 RESTful API 设计原则
- 响应式设计支持多设备
- 错误处理和用户友好提示
- 代码注释和文档完整

## 扩展建议

1. **数据持久化：** 集成 Supabase、PlanetScale 等数据库
2. **用户认证：** 添加 GitHub OAuth 登录
3. **文件上传：** 支持简历或作品文件上传
4. **邮件通知：** 集成邮件服务发送确认邮件
5. **管理后台：** 添加管理员界面查看提交记录
6. **数据分析：** 集成 Analytics 追踪用户行为

## 许可证

MIT License

