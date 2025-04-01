<template>
  <v-container>
    <v-row justify="space-between" align="center" class="mb-4">
      <div>
        <h2 class="text-h5">Мытую Эфиопию для {{ auth.user?.name }}!</h2>
      </div>
      <v-btn color="error" prepend-icon="mdi-logout" @click="logout">
        Выйти
      </v-btn>
    </v-row>

    <!-- Фильтры -->
    <v-card class="mb-4" flat>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Фильтр по дате создания"
            v-model="filterDate"
            type="date"
            prepend-icon="mdi-calendar"
            density="comfortable"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="selectedStatuses"
            :items="['Active', 'Inactive']"
            label="Фильтр по статусу"
            multiple
            chips
            prepend-icon="mdi-filter"
            density="comfortable"
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- Таблица -->
    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      :items-per-page="10"
      class="elevation-1"
    >
      <template #item.created="{ item }">
        {{ formatDate(item.created) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';

definePageMeta({ middleware: 'auth' }); // редирект если не авторизован

const auth = useAuthStore();
const usersStore = useUsersStore();

const filterDate = ref('');
const selectedStatuses = ref<string[]>([]);

const logout = () => {
  auth.logout();
  navigateTo('/login');
};

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Имя', key: 'name' },
  { title: 'Фамилия', key: 'surname' },
  { title: 'Статус', key: 'status' },
  { title: 'Дата создания', key: 'created' },
];

const filteredUsers = computed(() => {
  return usersStore.users.filter((user) => {
    const userDate = user.created.split(' ')[0].split('.').reverse().join('-');
    if (filterDate.value && userDate !== filterDate.value) {
      return false;
    }
    if (
      selectedStatuses.value.length &&
      !selectedStatuses.value.includes(user.status)
    ) {
      return false;
    }
    return true;
  });
});

const formatDate = (str: string) => {
  return str.replace(' ', ' · ');
};
</script>
