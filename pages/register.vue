<template>
  <div class="flex flex-col-reverse md:flex-row h-screen gap-5 md:gap-20">
    <div
      class="md:flex-1 flex flex-col items-center md:items-end justify-center"
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
                  v$.name.$error,
              }"
            >
              <Icon
                name="ic:baseline-person"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 transition-all"
              />
              <input
                type="text"
                class="w-full bg-transparent outline-none text-white h-14"
                placeholder="Nome completo"
                v-model="formData.name"
                @change="v$.name.$touch"
              />
            </div>
            <span
              v-if="v$.name.$error"
              class="text-sm font-semibold text-red-500"
              >{{ v$.name.$errors[0].$message }}</span
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
                v-model="formData.password"
                @change="v$.password.$touch"
              />
              <Icon
                v-if="!showPassword"
                name="ic:outline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                @click="handleShowPassword"
              />
              <Icon
                v-else
                name="ic:baseline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                @click="handleShowPassword"
              />
            </div>
            <span
              v-if="v$.password.$error"
              class="text-sm font-semibold text-red-500"
              >{{ v$.password.$errors[0].$message }}</span
            >
          </div>
          <div class="group mt-3 flex flex-col gap-1">
            <div
              class="flex flex-row items-center gap-3 rounded-lg bg-zinc-900 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-blue-600 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              :class="{
                'ring-1 ring-red-500 focus:ring-red-500 group-focus-within:ring-red-500':
                  v$.confirmPassword.$error,
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
                placeholder="Confirmar senha"
                v-model="formData.confirmPassword"
                @change="v$.confirmPassword.$touch"
              />
              <Icon
                v-if="!showPassword"
                name="ic:outline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                @click="handleShowPassword"
              />
              <Icon
                v-else
                name="ic:baseline-remove-red-eye"
                size="24"
                class="text-zinc-800 group-focus-within:text-blue-600 hover:text-blue-600 transition-all cursor-pointer"
                @click="handleShowPassword"
              />
            </div>
            <span
              v-if="v$.confirmPassword.$error"
              class="text-sm font-semibold text-red-500"
              >{{ v$.confirmPassword.$errors[0].$message }}</span
            >
          </div>
          <p
            class="text-white text-base text-center cursor-pointer my-4 transition-all"
          >
            Ao se registrar, você aceita nossos
            <span class="text-blue-600 font-bold hover:text-blue-500"
              >termos de uso</span
            >
            e a nossa
            <span class="text-blue-600 font-bold hover:text-blue-500"
              >política de privacidade</span
            >.
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
            <p v-else>Cadastrar</p>
          </button>
        </form>
      </div>
    </div>
    <div
      class="md:flex-1 flex flex-col justify-center items-center md:items-start"
    >
      <div
        class="flex flex-col text-white text-2xl md:text-4xl text-center font-bold"
      >
        <p>Que ta tirar</p>
        <p>aquela dúvida</p>
        <p>com o publico</p>
      </div>
      <p class="text-zinc-400 mt-6 text-center">para realizar suas enquetes.</p>
      <p class="text-zinc-400 mb-6 text-center">
        Junte-se a milhares de pessoas para realizar suas enquetes.
      </p>
      <button
        class="flex flex-row items-center"
        @click="() => router.push({ name: 'Login' })"
      >
        <Icon
          name="ic:baseline-arrow-back-ios"
          class="text-blue-600 hover:text-blue-500 transition-all"
          size="18"
        />
        <span class="font-bold text-blue-600 hover:text-blue-500 transition-all"
          >Voltar para o inicio</span
        >
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  name: "Register",
  path: "/register",
  layout: "auth",
});

const formData = reactive({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    name: {
      required: helpers.withMessage("The name field is required", required),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "The password must have at least 6 characters",
        minLength(6)
      ),
    },
    confirmPassword: {
      required: helpers.withMessage(
        "The confirm password field is required",
        required
      ),
      sameAs: helpers.withMessage(
        "The confirm password must be the same as the password",
        sameAs(formData.password)
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
