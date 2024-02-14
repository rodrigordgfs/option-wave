import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  id: "useUserStore",
  persist: true,
  state: () => ({
    user: null,
  }),
  actions: {
    async signIn(email, password) {
      await $fetch("/user", {
        baseURL: useRuntimeConfig().public.apiUrl,
        method: "GET",
        params: {
          email,
          password,
        },
      })
        .then((data) => {
          this.user = data;
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },

    async signUp(email, password, name) {
      await $fetch("/user", {
        baseURL: useRuntimeConfig().public.apiUrl,
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      })
        .then((data) => {
          this.user = data;
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },

    async signOut() {
      this.user = null;
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.user;
    },
  },
});
