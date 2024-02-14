import { defineStore } from "pinia";

export const usePasswordStore = defineStore("password", {
  id: "usePasswordStore",
  state: () => ({
    showPassword: false,
    showConfirmPassword: false,
  }),
  actions: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
  getters: {
    passwordType() {
      return this.showPassword ? "text" : "password";
    },
    confirmPasswordType() {
      return this.showConfirmPassword ? "text" : "password";
    },
  },
});
