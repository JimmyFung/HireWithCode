export interface ChallengeAcceptance {
  id?: string;
  githubId: string;
  email: string;
  createdAt?: Date;
}

export interface ChallengeSubmission {
  id?: string;
  githubId?: string;
  email?: string;
  repoUrl: string;
  vercelUrl: string;
  createdAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

