<template>
  <div class="flex flex-row h-screen gap-20">
    <div
      class="flex-1 flex flex-col justify-center items-end text-white text-6xl font-bold"
    >
      <img src="/logo.png" class="w-36" />
      <div class="flex flex-col mt-3">
        <p>Faça seu login</p>
        <p>na plataforma</p>
      </div>
    </div>
    <div class="flex-1 flex flex-col items-start justify-center">
      <div
        class="flex flex-col max-w-[480px] w-full bg-zinc-800 p-16 rounded-lg"
      >
        <form @submit.prevent="handleSubmitForm">
          <div class="group mt-3 flex flex-col gap-1">
            <div
              class="flex flex-row items-center gap-3 rounded-lg bg-zinc-900 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-purple-600 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'ring-1 ring-red-500 focus:ring-red-500 group-focus-within:ring-red-500':
                  v$.email.$error,
              }"
            >
              <Icon
                name="ic:baseline-email"
                size="24"
                class="text-zinc-800 group-focus-within:text-purple-600 transition-all"
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
              class="flex flex-row items-center gap-3 rounded-lg bg-zinc-900 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-purple-600 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'ring-1 ring-red-500 focus:ring-red-500 group-focus-within:ring-red-500':
                  v$.password.$error,
              }"
            >
              <Icon
                name="ic:outline-lock"
                size="24"
                class="text-zinc-800 group-focus-within:text-purple-600 transition-all"
              />
              <input
                :type="passwordType"
                class="w-full bg-transparent outline-none text-white h-14 flex-1"
                placeholder="Senha"
                v-model="formData.password"
                @change="v$.password.$touch"
              />
              <Icon
                v-if="!showPassword"
                name="ic:outline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-purple-600 hover:text-purple-600 transition-all cursor-pointer"
                @click="handleShowPassword"
              />
              <Icon
                v-else
                name="ic:baseline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-purple-600 hover:text-purple-600 transition-all cursor-pointer"
                @click="handleShowPassword"
              />
            </div>
            <span
              v-if="v$.password.$error"
              class="text-sm font-semibold text-red-500"
              >{{ v$.password.$errors[0].$message }}</span
            >
          </div>
          <p
            class="text-purple-600 font-bold text-base hover:text-purple-500 cursor-pointer my-3 transition-all"
          >
            Esqueci minha senha
          </p>
          <button
            class="w-full text-white bg-purple-800 py-3 rounded-lg hover:bg-purple-900 transition-all uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
              class="text-purple-600 font-bold cursor-pointer hover:text-purple-500 transition-all"
              @click="() => router.push({ name: 'Register' })"
              >Registre-se</span
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  name: "Login",
  path: "/login",
  layout: "auth",
  // middleware: "auth",
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
const user = useSupabaseUser();
const client = useSupabaseClient();
const v$ = useVuelidate(rules, formData);

const showPassword = ref(false);
const isSubmitting = ref(false);

const passwordType = computed(() => (showPassword.value ? "text" : "password"));

const handleShowPassword = () => (showPassword.value = !showPassword.value);

const handleSubmitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    handleLogin();
  }
};

const handleLogin = async () => {
  isSubmitting.value = true;
  const { error } = await client.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  if (error) {
    console.error(error);
  } else {
    router.push({
      name: "Home",
    });
  }
  isSubmitting.value = false;
};
</script>

<style></style>
