import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import challengeRoutes from './routes/challenge';
import { ApiResponse } from './types';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(helmet());
app.use(cors({
  origin: '*', // 允许所有来源，生产环境应该限制具体域名
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 健康检查接口
app.get('/health', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'HireWithCode API Server is running',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }
  };
  res.json(response);
});

// API 路由
app.use('/api/challenge', challengeRoutes);

// 根路径
app.get('/', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'Welcome to HireWithCode API',
    data: {
      version: '1.0.0',
      endpoints: {
        health: '/health',
        acceptChallenge: 'POST /api/challenge/accept',
        submitChallenge: 'POST /api/challenge/submit',
        getAcceptances: 'GET /api/challenge/acceptances',
        getSubmissions: 'GET /api/challenge/submissions'
      }
    }
  };
  res.json(response);
});

// 404 处理
app.use('*', (req, res) => {
  const response: ApiResponse = {
    success: false,
    message: '接口不存在',
    error: 'Endpoint not found'
  };
  res.status(404).json(response);
});

// 错误处理中间件
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  const response: ApiResponse = {
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  };
  res.status(500).json(response);
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 HireWithCode API Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}/`);
});

export default app;

