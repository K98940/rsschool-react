import { Errors } from '@/types/types';
import { initialErrors } from './constants';

const errorsKeys = Object.keys(initialErrors);

export const isCustomErrors = (data: unknown | Errors): data is Errors => {
  if (typeof data !== 'object') return false;
  return errorsKeys.every(
    (key) => key in (data as Errors) && Array.isArray((data as Errors)[key]),
  );
};

export const isNumberExist = (password: string): boolean =>
  /[0-9]/.test(password);

export const isLowercaseExist = (password: string): boolean =>
  /[a-zа-я]+/.test(password);

export const isUppercaseExist = (password: string): boolean =>
  /[A-ZА-Я]+/.test(password);

export const isSpecialExist = (password: string): boolean =>
  /[~!@#$%^&*()\-+\\|/=_?:;№"`.,<>]+/.test(password);
