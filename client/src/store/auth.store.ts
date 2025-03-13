import { create } from "zustand";
import {
  UserResponseType,
  SignInCredentials,
  SignUpCredentials,
  User,
} from "../types/types";
import { showToast } from "../utils/toast";

interface AuthStore {
  currUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currUser: null,
  loading: false,
  error: null,
  
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/me");
      const data: UserResponseType = await res.json();

      if (data.success == true) {
        set({ currUser: data.user, loading: false });
      } else {
        set({ currUser: null, loading: false, error: data.message });
      }
    } catch (error) {
      set({ currUser: null, loading: false });
    }
  },

  signUp: async (credentials) => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data: UserResponseType = await res.json();

      if (data.success) {
        set({ loading: false });
        showToast({ message: data.message, type: "success" });
      } else {
        set({ error: data.message });
        showToast({ message: data.message, type: "error" });
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  signIn: async (credentials) => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data: UserResponseType = await res.json();

      if (data.success) {
        set({ loading: false, currUser: data.user });
        showToast({ message: data.message, type: "success" });
      } else {
        set({ error: data.message });
        showToast({ message: data.message, type: "error" });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      const data: UserResponseType = await res.json();

      if (data.success) {
        set({ loading: false, currUser: null });
        showToast({ message: data.message, type: "success" });
      } else {
        set({ error: data.message });
        showToast({ message: data.message, type: "error" });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));
