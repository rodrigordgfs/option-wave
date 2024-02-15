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
        })
        .catch((error) => {
          console.log(error);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async signOut() {
      this.user = null;
    },

    async update(name, image) {
      await $fetch(`/user/${this.user.id}`, {
        baseURL: useRuntimeConfig().public.apiUrl,
        method: "PATCH",
        body: JSON.stringify({
          name,
          image,
        }),
      })
        .then((data) => {
          this.user = data;
          console.log(this.user, data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.user;
    },
  },
});
