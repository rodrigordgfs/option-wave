<template>
  <h1 class="text-3xl font-bold underline text-white">
    <!-- {{ useUser.user }} -->
  </h1>
</template>

<script setup>
definePageMeta({
  name: "Home",
  middleware: "auth",
});

// const useUser = useUserStore();
</script>

<style></style>
