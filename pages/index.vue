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
useHead({
    title: 'Option Wave - Pools',
});

// const useUser = useUserStore();
</script>

<style></style>
