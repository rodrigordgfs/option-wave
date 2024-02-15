import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  id: "useModalStore",
  state: () => ({
    showModalProfile: false,
  }),
  actions: {
    toggleModalProfile() {
      this.showModalProfile = !this.showModalProfile;
    },
  },
});
