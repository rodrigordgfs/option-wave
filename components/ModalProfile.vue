<template>
  <div
    v-if="useModal.showModalProfile"
    class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
  >
    <OnClickOutside @trigger="useModal.toggleModalProfile">
      <div class="bg-zinc-900 shadow p-5 rounded-2xl m-2">
        <div class="flex flex-col items-center max-w-full w-72">
          <p class="text-white font-bold text-4xl mb-4">Profile</p>
          <img
            v-if="fileDisplay"
            :src="fileDisplay"
            class="rounded-full w-20 h-20 shadow"
          />
          <img
            v-else-if="userStore.user?.image"
            :src="userImage"
            class="rounded-full w-20 h-20 shadow"
          />
          <div
            v-else
            class="rounded-full flex items-center justify-center bg-blue-600 w-20 h-20 mt-4 text-3xl text-white font-bold shadow"
          >
            {{ initialsName }}
          </div>
          <label
            for="fileInput"
            class="text-white bg-blue-600 py-2 px-6 mt-4 rounded-lg hover:bg-blue-700 transition-all uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Upload
            <input
              id="fileInput"
              ref="file"
              type="file"
              hidden
              accept=".jpg,.jpeg,.png"
              @input="onChange"
            />
          </label>
          <form class="mt-4" @submit.prevent="handleSubmitForm">
            <div class="group flex flex-col gap-1">
              <div
                class="flex flex-row items-center gap-3 rounded-lg bg-zinc-800 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-blue-600 transition-all cursor-not-allowed opacity-50"
              >
                <Icon
                  name="ic:baseline-email"
                  size="24"
                  class="text-zinc-700 group-focus-within:text-blue-600 transition-all"
                />
                <input
                  type="email"
                  class="w-full bg-transparent outline-none text-white h-14 cursor-not-allowed"
                  placeholder="E-mail"
                  v-model="formData.email"
                  @change="v$.email.$touch"
                  disabled
                />
              </div>
            </div>
            <div class="group mt-3 flex flex-col gap-1">
              <div
                class="flex flex-row items-center gap-3 rounded-lg bg-zinc-800 px-4 border-transparent group-focus-within:ring-1 group-focus-within:ring-blue-600 transition-all"
                :class="{
                  'ring-1 ring-red-500 focus:ring-red-500 group-focus-within:ring-red-500':
                    v$.name.$error,
                  'disabled:cursor-not-allowed disabled:opacity-50':
                    isSubmitting,
                }"
              >
                <Icon
                  name="ic:baseline-person"
                  size="24"
                  class="text-zinc-700 group-focus-within:text-blue-600 transition-all"
                />
                <input
                  type="text"
                  class="w-full bg-transparent outline-none text-white h-14"
                  autocomplete="name"
                  placeholder="Nome completo"
                  v-model="formData.name"
                  @change="v$.name.$touch"
                  :disabled="isSubmitting"
                />
              </div>
              <span
                v-if="v$.name.$error"
                class="text-sm font-semibold text-red-500"
                >{{ v$.name.$errors[0].$message }}</span
              >
            </div>
            <button
              class="w-full text-white bg-blue-800 py-3 mt-4 rounded-lg hover:bg-blue-900 transition-all uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              :disabled="isSubmitting"
            >
              <Icon
                v-if="isSubmitting"
                name="eos-icons:bubble-loading"
                color="#FFF"
                size="24"
              />
              <p v-else>Salvar</p>
            </button>
            <button
              class="w-full text-white bg-red-600 py-3 mt-4 rounded-lg hover:bg-red-700 transition-all uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isLogouting"
              @click="handleLogout"
            >
              <Icon
                v-if="isLogouting"
                name="eos-icons:bubble-loading"
                color="#FFF"
                size="24"
              />
              <p v-else>Sair</p>
            </button>
          </form>
        </div>
      </div>
    </OnClickOutside>
  </div>
</template>

<script setup>
import { OnClickOutside } from "@vueuse/components";
import { required, email, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { v4 as uuidv4 } from "uuid";

const useModal = useModalStore();
const userStore = useUserStore();
const router = useRouter();
const client = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    name: {
      required: helpers.withMessage("The name field is required", required),
    },
  };
});

const userImage = computed(() => {
  return runtimeConfig.public.bucketUrl + userStore.user.image;
});

const formData = reactive({
  name: userStore.user.name,
  email: userStore.user.email,
  image: userStore.user.image,
});

const v$ = useVuelidate(rules, formData);

const isSubmitting = ref(false);
const isLogouting = ref(false);
const file = ref(null);
const fileDisplay = ref(null);
const fileData = ref(null);

const initialsName = computed(() => {
  const name = String(userStore.user.name).split(" ");
  return `${name[0][0]}${name[1][0]}`;
});

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
  fileData.value = file.value.files[0];
};

const handleSubmitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    handleSave();
  }
};

const handleSave = async () => {
  isSubmitting.value = true;

  let dataOut = null;
  let errorOut = null;

  if (fileData.value) {
    const { data, error } = await client.storage
      .from("users")
      .upload(`${userStore.user.id}.jpg`, fileData.value, {
        cacheControl: "3600",
        upsert: true,
      });
    console.log(data);
    dataOut = data;
    errorOut = error;
  }

  if (errorOut) {
    isSubmitting.value = false;
    return errorOut;
  }

  if (dataOut) {
    formData.image = dataOut.path ? dataOut.path : "";
  }

  userStore.update(formData.name, formData.image);
  isSubmitting.value = false;
};

const handleLogout = async () => {
  isLogouting.value = true;
  userStore.signOut();
  useModal.toggleModalProfile();
  router.push({
    name: "Login",
  });
  isLogouting.value = false;
};
</script>

<style></style>
