import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  ecoPoints: number;
  rank: string;
  joinedDate: Date;
  achievements: string[];
  profileImage?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (isAuth: boolean, user?: User) => void;
  logout: () => void;
  addEcoPoints: (points: number) => void;
  updateUser: (userData: User) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (isAuth, user = null) => set({ isAuthenticated: isAuth, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  addEcoPoints: (points) => 
    set((state) => ({
      user: state.user 
        ? { 
            ...state.user, 
            ecoPoints: (state.user.ecoPoints || 0) + points,
            rank: calculateRank((state.user.ecoPoints || 0) + points)
          }
        : null
    })),
  updateUser: async (userData) => {
    // Here you would typically make an API call to update the user data
    set({ user: userData });
  }
}));

// Ranking system
export const calculateRank = (points: number): string => {
  if (points >= 10000) return 'Eco Legend';
  if (points >= 5000) return 'Environmental Master';
  if (points >= 2500) return 'Sustainability Champion';
  if (points >= 1000) return 'Green Warrior';
  if (points >= 500) return 'Eco Guardian';
  if (points >= 250) return 'Nature Protector';
  if (points >= 100) return 'Earth Defender';
  return 'Eco Rookie';
};