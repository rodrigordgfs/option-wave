<template>
  <div
    id="Header"
    class="bg-zinc-950 w-full flex items-center justify-center px-2 shadow"
  >
    <div
      class="max-w-container w-full my-4 flex flex-row items-center justify-between"
    >
      <img src="/logo.png" alt="Logo Options Wave" class="cursor-pointer h-8" />
      <div class="hidden md:flex flex-row items-center gap-4">
        <button
          class="text-white bg-transparent border border-blue-600 w-32 py-2 rounded-lg hover:bg-blue-600 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Poll
        </button>
        <img
          v-if="userStore.user?.image"
          class="h-10 w-10 rounded-full shadow cursor-pointer"
          :src="userImage"
          @click="useModal.toggleModalProfile"
        />
        <div
          v-else
          class="rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-10 h-10 cursor-pointer transition-all text-white font-bold shadow"
          @click="useModal.toggleModalProfile"
        >
          {{ initialsName }}
        </div>
      </div>
      <div
        class="block md:hidden p-2 rounded-lg hover:bg-blue-600 transition-all"
      >
        <Icon name="ic:round-menu" size="32" color="#FFF" />
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const useModal = useModalStore();
const runtimeConfig = useRuntimeConfig();

const initialsName = computed(() => {
  const name = String(userStore.user.name).split(" ");
  return `${name[0][0]}${name[1][0]}`;
});

const userImage = computed(() => {
  return runtimeConfig.public.bucketUrl + userStore.user.image;
});
</script>

<style></style>
