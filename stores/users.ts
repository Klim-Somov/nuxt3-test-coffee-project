import { defineStore } from 'pinia';
import usersData from '@/assets/data/users.json';

interface UserRow {
  id: number;
  name: string;
  surname: string;
  status: string;
  created: string;
}

export const useUsersStore = defineStore('users', {
  state: () => {
    // Преобразуем исходный массив пользователей, добавляя id и status
    const tableData: UserRow[] = usersData.map((u, index) => ({
      id: index + 1,
      name: u.name,
      surname: u.surname,
      status: u.active ? 'Active' : 'Inactive',
      created: u.created,
    }));
    return { users: tableData };
  },
});
