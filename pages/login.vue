<template>
  <div class="login-page">
    <h2>Вход в систему</h2>
    <form class="login-form" @submit.prevent="onSubmit">
      <label>
        Логин:
        <input v-model="username" type="text" placeholder="Email" />
      </label>
      <label>
        Пароль:
        <input v-model="password" type="password" placeholder="Ваш пароль" />
      </label>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error-message">⚠ {{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
const auth = useAuthStore();
const username = ref('');
const password = ref('');
const error = ref<string | null>(null);

const onSubmit = async () => {
  error.value = null;
  const success = await auth.login(username.value, password.value);
  if (success) {
    return navigateTo('/'); // перенаправляем на страницу аккаунта
  } else {
    error.value = 'Неверные данные авторизации. Попробуйте ещё раз.';
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 1em;
}
</style>
