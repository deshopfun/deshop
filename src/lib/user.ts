import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserPerisistState = {
  auth: string;
  isLogin: boolean;
  userTheme: 'auto' | 'light' | 'dark';
  showProgress: boolean;
};

type UserPerisistAction = {
  setAuth: (auth: string) => void;
  getAuth: () => string;
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
