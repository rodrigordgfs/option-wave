export default defineNuxtRouteMiddleware((to, from) => {
  const useUser = useUserStore();
  const isAuthenticated = useUser.isAuthenticated;

  if (!isAuthenticated) {
    return navigateTo("/login");
  }
});
