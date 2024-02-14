export default defineNuxtRouteMiddleware((to, from) => {
  const useUser = useUserStore();
  const isAuthenticated = computed(() => useUser.isAuthenticated)

  if (!isAuthenticated) {
    return navigateTo("/login");
  }
});
