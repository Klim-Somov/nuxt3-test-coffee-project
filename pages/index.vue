<template>
  <div class="account-page">
    <header class="account-header">
      <h2>Здравствуйте, {{ auth.user?.name }}!</h2>
      <button @click="handleLogout">Выйти</button>
    </header>
    <!-- Фильтры -->
    <div class="filters">
      <div>
        <label
          >Фильтр по дате:
          <input type="date" v-model="filterDate" />
        </label>
      </div>
      <div>
        <span>Статус:</span>
        <label
          ><input type="checkbox" value="Active" v-model="selectedStatuses" />
          Active</label
        >
        <label
          ><input type="checkbox" value="Inactive" v-model="selectedStatuses" />
          Inactive</label
        >
      </div>
    </div>
    <!-- Таблица с данными -->
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Статус</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';

definePageMeta({ middleware: 'auth' }); // редирект если не авторизован

const auth = useAuthStore();
const usersStore = useUsersStore();
// Локальные состояния фильтров
const filterDate = ref<string>(''); // выбранная дата (YYYY-MM-DD)
const selectedStatuses = ref<Array<string>>([]); // выбранные статусы

// Computed свойство для отфильтрованных пользователей
const filteredUsers = computed(() => {
  return usersStore.users.filter((user) => {
    // Фильтр по дате создания (если выбрана)
    if (filterDate.value) {
      // сравниваем только по дате (без времени)
      const createdDate = new Date(
        user.created.split(' ')[0].split('.').reverse().join('-')
      );
      const selectedDate = new Date(filterDate.value);
      if (createdDate.toDateString() !== selectedDate.toDateString()) {
        return false;
      }
    }
    // Фильтр по статусу (если выбраны какие-то статусы)
    if (
      selectedStatuses.value.length > 0 &&
      !selectedStatuses.value.includes(user.status)
    ) {
      return false;
    }
    return true;
  });
});

// Обработчик выхода
const handleLogout = () => {
  auth.logout();
  navigateTo('/login');
};
</script>
