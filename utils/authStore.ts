import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store"; // Importiamo tutto come namespace per sicurezza

interface UserData {
  id: string;
  email: string;
  isActive: boolean;
  isSuperUser: boolean;
  isVerified: boolean;
}

type UserState = {
  isLoggedIn: boolean;
  token: string | null;
  user: UserData | null;
  logIn: (token: string, user: UserData) => void;
  logOut: () => void;
};

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      logIn: (token, user) => {
        set({
          isLoggedIn: true,
          token: token,
          user: user,
        });
      },
      logOut: () => {
        set({
          isLoggedIn: false,
          token: null,
          user: null,
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem: SecureStore.setItemAsync,
        getItem: SecureStore.getItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      })),
    }
  )
);