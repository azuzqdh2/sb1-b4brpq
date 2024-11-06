import { create } from 'zustand';

interface State {
  isLoading: boolean;
  messages: Message[];
  currentUser: User | null;
  isTyping: boolean;
  theme: 'light' | 'dark' | 'system';
  setIsLoading: (loading: boolean) => void;
  addMessage: (message: Message) => void;
  setCurrentUser: (user: User | null) => void;
  setIsTyping: (typing: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  reactions: Reaction[];
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

interface Reaction {
  emoji: string;
  users: string[];
}

export const useStore = create<State>((set) => ({
  isLoading: true,
  messages: [],
  currentUser: null,
  isTyping: false,
  theme: 'system',
  setIsLoading: (loading) => set({ isLoading }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setTheme: (theme) => set({ theme }),
}));