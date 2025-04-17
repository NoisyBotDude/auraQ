import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Quiz } from '../types';

// Auth Context
interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    // Implement login logic
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleAnimations = () => setAnimationsEnabled(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, animationsEnabled, toggleAnimations }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Quiz Context
interface QuizContextType {
  currentQuiz: Quiz | null;
  currentQuestion: number;
  score: number;
  setQuiz: (quiz: Quiz) => void;
  nextQuestion: () => void;
  updateScore: (points: number) => void;
  showCompletionScreen: boolean;
  setShowCompletionScreen: (show: boolean) => void;
  setCurrentQuestion: (questionNumber: number) => void;
  setScore: (score: number) => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  const nextQuestion = () => {
    if (currentQuiz && currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowCompletionScreen(true);
    }
  };

  const updateScore = (points: number) => {
    setScore(prev => prev + points);
  };

  return (
    <QuizContext.Provider value={{
      currentQuiz,
      currentQuestion,
      score,
      setQuiz: setCurrentQuiz,
      nextQuestion,
      updateScore,
      showCompletionScreen,
      setShowCompletionScreen,
      setCurrentQuestion,
      setScore
    }}>
      {children}
    </QuizContext.Provider>
  );
};

// Notification Context
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Audio Context
interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (soundName: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const toggleMute = () => setIsMuted(prev => !prev);
  const playSound = (soundName: string) => {
    // Implement sound playing logic
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

// Custom hooks for using contexts
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 