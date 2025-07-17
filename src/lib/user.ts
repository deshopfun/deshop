import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserPerisistState = {
  auth: string;
  username: string;
  userEmail: string;
  userAvatar: string;
  isLogin: boolean;
  userTheme: 'auto' | 'light' | 'dark';
  showProgress: boolean;
};

type UserPerisistAction = {
  setAuth: (auth: string) => void;
  getAuth: () => string;
  setUsername: (username: string) => void;
  getUsername: () => string;
  setUserEmail: (userEmail: string) => void;
  getUserEmail: () => string;
  setUserAvatar: (userAvatar: string) => void;
  getUserAvatar: () => string;
  setIsLogin: (isLogin: boolean) => void;
  getIsLogin: () => boolean;
  setUserTheme: (theme: 'auto' | 'light' | 'dark') => void;
  getUserTheme: () => string;
  setShowProgress: (showProgress: boolean) => void;
  getShowProgress: () => boolean;

  resetUser: () => void;
};

const initialUserState: UserPerisistState = {
  auth: '',
  username: '',
  userEmail: '',
  userAvatar: '',
  isLogin: false,
  userTheme: 'auto',
  showProgress: false,
};

export const useUserPresistStore = create(
  persist<UserPerisistState & UserPerisistAction>(
    (set, get) => ({
      ...initialUserState,

      setAuth: (value) => set(() => ({ auth: value })),
      getAuth: () => get().auth,
      setUsername: (value) => set(() => ({ username: value })),
      getUsername: () => get().username,
      setUserEmail: (value) => set(() => ({ userEmail: value })),
      getUserEmail: () => get().userEmail,
      setUserAvatar: (value) => set(() => ({ userAvatar: value })),
      getUserAvatar: () => get().userAvatar,
      setIsLogin: (value) => set(() => ({ isLogin: value })),
      getIsLogin: () => get().isLogin,
      setUserTheme: (value) => set(() => ({ userTheme: value })),
      getUserTheme: () => get().userTheme,
      setShowProgress: (value) => set(() => ({ showProgress: value })),
      getShowProgress: () => get().showProgress,

      resetUser: () => {
        set(initialUserState);
      },
    }),
    {
      name: 'deshop.user.market',
    },
  ),
);
