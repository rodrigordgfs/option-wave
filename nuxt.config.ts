import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Option Wave",
    },
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "nuxt-icon",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/image",
  ],
  alias: {
    "@": path.resolve(__dirname, "./"),
    "~": path.resolve(__dirname, "./"),
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: { redirect: false },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      bucketUrl: process.env.BUCKET_URL,
    },
  },
});
