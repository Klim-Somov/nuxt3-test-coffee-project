<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="400" elevation="8">
      <v-card-title class="text-h6 text-center">Вход в систему</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSubmit" ref="formRef">
          <v-text-field
            v-model="username"
            label="Email"
            type="email"
            prepend-icon="mdi-account"
            required
          />
          <v-text-field
            v-model="password"
            label="Пароль"
            type="password"
            prepend-icon="mdi-lock"
            required
          />

          <v-alert
            v-if="error"
            type="error"
            class="mt-2"
            density="compact"
            border="start"
          >
            {{ error }}
          </v-alert>

          <v-btn class="mt-4" color="primary" type="submit" block>
            Войти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const formRef = ref();

const onSubmit = async () => {
  error.value = null;
  const ok = await auth.login(username.value, password.value);
  if (ok) {
    navigateTo('/account');
  } else {
    error.value = 'Неверные данные. Попробуйте ещё раз.';
  }
};
</script>
