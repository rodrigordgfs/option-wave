<template>
  <div
    class="flex flex-col items-center justify-center md:flex-row h-screen gap-5 md:gap-20"
  >
    <div
      class="md:flex-1 flex flex-col justify-center items-center md:items-end"
    >
      <img src="/logo.png" class="w-36" />
      <div class="flex flex-col text-white text-3xl md:text-6xl font-bold mt-3">
        <p>Faça seu login</p>
        <p>na plataforma</p>
      </div>
    </div>
    <div
      class="md:flex-1 flex flex-col items-center md:items-start justify-center"
    >
      <div
        class="flex flex-col max-w-[480px] w-full bg-zinc-800 py-16 px-10 md:p-16 rounded-lg"
      >
        <form @submit.prevent="handleSubmitForm">
          <div class="group flex flex-col gap-1">
            <div
              class="flex flex-row items-center gap-3 rounded-lg bg-zinc-900 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-blue-600 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'ring-1 ring-red-500 focus:ring-red-500 group-focus-within:ring-red-500':
                  v$.email.$error,
              }"
            >
              <Icon
                name="ic:baseline-email"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 transition-all"
              />
              <input
                type="email"
                class="w-full bg-transparent outline-none text-white h-14"
                placeholder="E-mail"
                v-model="formData.email"
                @change="v$.email.$touch"
              />
            </div>
            <span
              v-if="v$.email.$error"
              class="text-sm font-semibold text-red-500"
              >{{ v$.email.$errors[0].$message }}</span
            >
          </div>
          <div class="group mt-3 flex flex-col gap-1">
            <div
              class="flex flex-row items-center gap-3 rounded-lg bg-zinc-900 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-blue-600 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'ring-1 ring-red-500 focus:ring-red-500 group-focus-within:ring-red-500':
                  v$.password.$error,
              }"
            >
              <Icon
                name="ic:outline-lock"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 transition-all"
              />
              <input
                :type="passwordType"
                class="w-full bg-transparent outline-none text-white h-14 flex-1"
                placeholder="Senha"
                autocomplete="new-password"
                v-model="formData.password"
                @change="v$.password.$touch"
              />
              <Icon
                v-if="!showPassword"
                name="ic:outline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                @click="togglePassword"
              />
              <Icon
                v-else
                name="ic:baseline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                @click="togglePassword"
              />
            </div>
            <span
              v-if="v$.password.$error"
              class="text-sm font-semibold text-red-500"
              >{{ v$.password.$errors[0].$message }}</span
            >
          </div>
          <p
            class="text-blue-600 font-bold text-base hover:text-blue-500 cursor-pointer my-4 transition-all"
          >
            Esqueci minha senha
          </p>
          <button
            class="w-full text-white bg-blue-800 py-3 rounded-lg hover:bg-blue-900 transition-all uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            :disabled="isSubmitting"
          >
            <Icon
              v-if="isSubmitting"
              name="eos-icons:bubble-loading"
              color="#FFF"
              size="24"
            />
            <p v-else>Entrar</p>
          </button>
          <p class="text-center mt-3 text-white">
            Não tem uma conta?
            <span
              class="text-blue-600 font-bold cursor-pointer hover:text-blue-500 transition-all"
              @click="() => router.push({ name: 'Register' })"
              >Registre-se</span
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  name: "Login",
  path: "/login",
  layout: "auth",
});

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "The password must have at least 6 characters",
        minLength(6)
      ),
    },
  };
});

const router = useRouter();
const useUser = useUserStore();
const { showPassword, togglePassword, passwordType } = usePasswordStore();
const v$ = useVuelidate(rules, formData);

const isSubmitting = ref(false);

const handleSubmitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    handleLogin();
  }
};

const handleLogin = async () => {
  isSubmitting.value = true;
  await useUser.signIn(formData.email, formData.password);
  if (useUser.isAuthenticated) {
    router.push({
      name: "Home",
    });
  }
  isSubmitting.value = false;
};
</script>

<style></style>
