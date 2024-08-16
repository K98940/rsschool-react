import { User } from '@/store/baseSlice';
import { SortDirection } from '@/types/types';

export function sortUsers(users: User[], order: SortDirection): User[] {
  return users.slice().sort((userA, userB) => {
    if (order.direction === 'asc')
      return userA.name.localeCompare(userB.name, undefined, {
        sensitivity: 'base',
      });
    return userB.name.localeCompare(userA.name, undefined, {
      sensitivity: 'base',
    });
  });
}
