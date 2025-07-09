import { ChallengeAcceptance, ChallengeSubmission } from '../types';

// 简单的内存数据库（生产环境应使用真实数据库）
class InMemoryDatabase {
  private acceptances: ChallengeAcceptance[] = [];
  private submissions: ChallengeSubmission[] = [];

  // 保存挑战接受记录
  saveAcceptance(acceptance: Omit<ChallengeAcceptance, 'id' | 'createdAt'>): ChallengeAcceptance {
    const newAcceptance: ChallengeAcceptance = {
      id: this.generateId(),
      ...acceptance,
      createdAt: new Date()
    };
    
    this.acceptances.push(newAcceptance);
    return newAcceptance;
  }

  // 保存挑战提交记录
  saveSubmission(submission: Omit<ChallengeSubmission, 'id' | 'createdAt'>): ChallengeSubmission {
    const newSubmission: ChallengeSubmission = {
      id: this.generateId(),
      ...submission,
      createdAt: new Date()
    };
    
    this.submissions.push(newSubmission);
    return newSubmission;
  }

  // 获取所有接受记录
  getAllAcceptances(): ChallengeAcceptance[] {
    return this.acceptances;
  }

  // 获取所有提交记录
  getAllSubmissions(): ChallengeSubmission[] {
    return this.submissions;
  }

  // 根据 GitHub ID 查找接受记录
  findAcceptanceByGithubId(githubId: string): ChallengeAcceptance | undefined {
    return this.acceptances.find(acc => acc.githubId === githubId);
  }

  // 生成简单的 ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const database = new InMemoryDatabase();

