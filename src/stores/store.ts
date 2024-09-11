import { defineStore } from 'pinia';

interface User {
  token: string;
  name: string;
  email: string;
}

const DARK_MODE_STORAGE_KEY = 'darkModeState';
const USER_STORAGE_KEY = 'userState';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useStore = defineStore({
  id: 'app',
  state: () => ({
    isDarkMode: false,
    user: null as User | null,
  }),
  actions: {
    initializeStore() {
      // Load dark mode state from local storage
      const storedDarkModeState = localStorage.getItem(DARK_MODE_STORAGE_KEY);
      if (storedDarkModeState) {
        this.isDarkMode = JSON.parse(storedDarkModeState);
        const body = document.querySelector('body');
        body?.classList.toggle('dark', this.isDarkMode);
      }

      // Load user state from local storage
      const storedUserState = localStorage.getItem(USER_STORAGE_KEY);
      const storedTimestamp = localStorage.getItem(`${USER_STORAGE_KEY}_timestamp`);
      const now = new Date().getTime();
      
      if (storedUserState && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp, 10);
        if (now - timestamp < EXPIRY_TIME) {
          this.user = JSON.parse(storedUserState);
        } else {
          // Clear expired user state
          this.user = null;
          localStorage.removeItem(USER_STORAGE_KEY);
          localStorage.removeItem(`${USER_STORAGE_KEY}_timestamp`);
        }
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;

      // Apply dark mode class
      const body = document.querySelector('body');
      body?.classList.toggle('dark', this.isDarkMode);

      // Save dark mode state to local storage
      localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(this.isDarkMode));
    },
    loginUser(userData: User) {
      this.user = userData;

      // Save user state to local storage with expiration timestamp
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.user));
      localStorage.setItem(`${USER_STORAGE_KEY}_timestamp`, new Date().getTime().toString());
    },
    logoutUser() {
      this.user = null;

      // Remove user state from local storage
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(`${USER_STORAGE_KEY}_timestamp`);
    },
  },
});

export type AppStore = ReturnType<typeof useStore>;
