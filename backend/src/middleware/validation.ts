import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证 GitHub ID 格式
export const validateGithubId = (githubId: string): boolean => {
  const githubIdRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
  return githubIdRegex.test(githubId) && githubId.length <= 39;
};

// 验证 URL 格式
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 验证挑战接受请求
export const validateAcceptanceRequest = (req: Request, res: Response, next: NextFunction) => {
  const { githubId, email } = req.body;

  if (!githubId || !email) {
    const response: ApiResponse = {
      success: false,
      message: 'GitHub ID 和邮箱地址都是必填项',
      error: 'Missing required fields'
    };
    return res.status(400).json(response);
  }

  if (!validateGithubId(githubId)) {
    const response: ApiResponse = {
      success: false,
      message: 'GitHub ID 格式不正确',
      error: 'Invalid GitHub ID format'
    };
    return res.status(400).json(response);
  }

  if (!validateEmail(email)) {
    const response: ApiResponse = {
      success: false,
      message: '邮箱地址格式不正确',
      error: 'Invalid email format'
    };
    return res.status(400).json(response);
  }

  next();
};

// 验证挑战提交请求
export const validateSubmissionRequest = (req: Request, res: Response, next: NextFunction) => {
  const { repoUrl, vercelUrl } = req.body;

  if (!repoUrl || !vercelUrl) {
    const response: ApiResponse = {
      success: false,
      message: 'GitHub 仓库 URL 和 Vercel 地址都是必填项',
      error: 'Missing required fields'
    };
    return res.status(400).json(response);
  }

  if (!validateUrl(repoUrl)) {
    const response: ApiResponse = {
      success: false,
      message: 'GitHub 仓库 URL 格式不正确',
      error: 'Invalid repository URL format'
    };
    return res.status(400).json(response);
  }

  if (!validateUrl(vercelUrl)) {
    const response: ApiResponse = {
      success: false,
      message: 'Vercel 地址格式不正确',
      error: 'Invalid Vercel URL format'
    };
    return res.status(400).json(response);
  }

  // 验证是否为 GitHub 仓库 URL
  if (!repoUrl.includes('github.com')) {
    const response: ApiResponse = {
      success: false,
      message: '请提供有效的 GitHub 仓库 URL',
      error: 'URL must be a GitHub repository'
    };
    return res.status(400).json(response);
  }

  next();
};

