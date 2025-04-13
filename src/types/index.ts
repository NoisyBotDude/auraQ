export interface User {
  id: string;
  username: string;
  avatar: AvatarConfig;
  stats: UserStats;
  inventory: PowerUp[];
  friends: string[];
}

export interface AvatarConfig {
  baseCharacter: string;
  accessories: string[];
  colors: Record<string, string>;
  unlocks: string[];
}

export interface UserStats {
  totalScore: number;
  quizzesTaken: number;
  winRate: number;
  categoryScores: Record<string, number>;
  streakDays: number;
  achievements: Achievement[];
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  effect: string;
  cooldown: number;
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  creatorId: string;
  likes: number;
  plays: number;
  tags: string[];
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple' | 'boolean' | 'image';
  options: string[];
  correctAnswer: number | number[];
  timeLimit: number;
  points: number;
  explanation?: string;
} 