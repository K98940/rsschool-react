import { useState } from 'react';
import { sortUsers } from '@/utils/sort';
import classes from './mainPage.module.css';
import { SortDirection } from '@/types/types';
import { useAppSelector } from '@/store/store';
import { selectUsers } from '@/store/baseSlice';

const initialSortDirection: SortDirection = {
  direction: 'asc',
};

export default function MainPage() {
  const users = useAppSelector(selectUsers);
  const [sortOrder, setSortOrder] = useState(initialSortDirection);
  const sortedUsers = sortUsers(users, sortOrder);

  function handleSort() {
    const newSortDirection = sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, direction: newSortDirection });
  }

  return (
    <section className={classes.sectionUsers} data-testid="section-users">
      <div className={classes.containerTable}>
        <table className={classes.usersTable}>
          <thead>
            <tr>
              <th onClick={handleSort} className="clickable">
                Name {sortOrder.direction === 'asc' ? '▲' : '▼'}
              </th>
              <th>Age</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers &&
              sortedUsers.map((user) => {
                const rowClasses = user.isRecent ? classes.usersRow_recent : '';
                const key = () => new Date().getTime() * Math.random();

                return (
                  <tr key={key()} className={rowClasses}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user['password-1']}</td>
                    <td>{user.gender}</td>
                    <td>{user.country}</td>
                    <td>
                      <div className={classes.userImage}>
                        {user.uploadBase64 && (
                          <img src={user.uploadBase64}></img>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
