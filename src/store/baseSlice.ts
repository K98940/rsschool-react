import { RootState } from './store';
import { List } from '@/types/types';
import genders from './genders.json';
import countries from './countries.json';
import { picture1, picture2 } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Country = List;
type Genders = List;
export type User = {
  name: string;
  age?: string;
  email: string;
  'password-1': string;
  'password-2'?: string;
  gender: string;
  country: string;
  upload?: Blob | Blob[];
  uploadBase64?: string;
  terms: string | boolean;
  form?: 'controlled' | 'uncontrolled';
  isRecent?: boolean;
};

const testUser: User[] = [
  {
    name: 'Petya',
    age: '30',
    email: 'petya@mail.com',
    form: 'controlled',
    isRecent: false,
    'password-1': 'Petya@mail.com',
    'password-2': 'Petya@mail.com',
    country: 'Albania',
    gender: 'pokemon',
    terms: true,
    uploadBase64: picture1,
    upload: undefined,
  },
  {
    name: 'Vasya',
    age: '27',
    email: 'vasya@gmail.com',
    form: 'uncontrolled',
    isRecent: true,
    'password-1': 'Vasya@gmail.com',
    'password-2': 'Vasya@gmail.com',
    country: 'Liberia',
    gender: 'zerg',
    terms: true,
    uploadBase64: picture2,
    upload: undefined,
  },
];

export interface baseState {
  countries: Country[];
  genders: Genders[];
  users: User[];
}

const initialState: baseState = {
  countries,
  genders,
  users: testUser,
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User>) => {
      const newState: User[] = state.users.map((user) => ({
        ...user,
        isRecent: false,
      }));
      newState.push(action.payload);
      state.users = newState;
    },
  },
});

export const { add } = baseSlice.actions;
export const selectUsers = (state: RootState) => state.base.users;
export const selectCountries = (state: RootState) => state.base.countries;
export const selectGenders = (state: RootState) => state.base.genders;
export default baseSlice.reducer;
