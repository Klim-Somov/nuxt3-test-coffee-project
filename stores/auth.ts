import { defineStore } from 'pinia';
import usersData from '@/assets/data/users.json';
import CryptoJS from 'crypto-js';

interface User {
  name: string;
  surname: string;
  credentials?: { username: string; passphrase: string };
  active: boolean;
  created: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => state.user != null,
  },
  actions: {
    async login(username: string, password: string): Promise<boolean> {
      // Имитируем проверку через "API": ищем пользователя в локальном JSON
      const user = usersData.find(
        (u) => u.credentials.username === username
      ) as User | undefined;
      if (user) {
        // Проверяем пароль
        const hash = CryptoJS.MD5(password).toString(); //  функция хеширования
        if (user.credentials && hash === user.credentials.passphrase) {
          this.user = { ...user, credentials: undefined };
          // (сохраняем пользователя, исключив поля пароля для безопасности)
          return true;
        }
      }
      // Если пользователя нет или пароль неверный:
      return false;
    },
    logout() {
      this.user = null;
    },
  },
  persist: true, // должна по идее сохранять state в LocalStorage/куки  (использую в первые. кайф. взлетело:))
});
