<template>
  <h1 class="text-3xl font-bold underline text-white">
    {{ user?.id }}
  </h1>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "Home",
  middleware: "auth",
});

const user = useSupabaseUser();
</script>

<style></style>
