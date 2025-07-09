import { Router, Request, Response } from 'express';
import { database } from '../utils/database';
import { validateAcceptanceRequest, validateSubmissionRequest } from '../middleware/validation';
import { ApiResponse, ChallengeAcceptance, ChallengeSubmission } from '../types';

const router = Router();

// 接受挑战
router.post('/accept', validateAcceptanceRequest, (req: Request, res: Response) => {
  try {
    const { githubId, email } = req.body;

    // 检查是否已经接受过挑战
    const existingAcceptance = database.findAcceptanceByGithubId(githubId);
    if (existingAcceptance) {
      const response: ApiResponse = {
        success: false,
        message: '您已经接受过挑战了',
        error: 'Challenge already accepted'
      };
      return res.status(409).json(response);
    }

    // 保存接受记录
    const acceptance = database.saveAcceptance({ githubId, email });

    const response: ApiResponse<ChallengeAcceptance> = {
      success: true,
      message: '挑战接受成功！',
      data: acceptance
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Accept challenge error:', error);
    const response: ApiResponse = {
      success: false,
      message: '服务器内部错误',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

// 提交挑战
router.post('/submit', validateSubmissionRequest, (req: Request, res: Response) => {
  try {
    const { repoUrl, vercelUrl, githubId, email } = req.body;

    // 保存提交记录
    const submission = database.saveSubmission({
      repoUrl,
      vercelUrl,
      githubId,
      email
    });

    const response: ApiResponse<ChallengeSubmission> = {
      success: true,
      message: '挑战提交成功！我们会尽快审查您的作品。',
      data: submission
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Submit challenge error:', error);
    const response: ApiResponse = {
      success: false,
      message: '服务器内部错误',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

// 获取所有接受记录（管理员接口）
router.get('/acceptances', (req: Request, res: Response) => {
  try {
    const acceptances = database.getAllAcceptances();
    const response: ApiResponse<ChallengeAcceptance[]> = {
      success: true,
      message: '获取成功',
      data: acceptances
    };
    res.json(response);
  } catch (error) {
    console.error('Get acceptances error:', error);
    const response: ApiResponse = {
      success: false,
      message: '服务器内部错误',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

// 获取所有提交记录（管理员接口）
router.get('/submissions', (req: Request, res: Response) => {
  try {
    const submissions = database.getAllSubmissions();
    const response: ApiResponse<ChallengeSubmission[]> = {
      success: true,
      message: '获取成功',
      data: submissions
    };
    res.json(response);
  } catch (error) {
    console.error('Get submissions error:', error);
    const response: ApiResponse = {
      success: false,
      message: '服务器内部错误',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

export default router;

