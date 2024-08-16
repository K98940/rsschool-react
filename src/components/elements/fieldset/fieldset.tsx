import { ReactNode } from 'react';
import { Errors } from '@/types/types';
import classes from './fieldset.module.css';
import { FieldErrors } from 'react-hook-form';
import { isCustomErrors } from '@/utils/predicates';

type FieldsetProps = {
  children: ReactNode;
  label: string;
  name?: string;
  errors: FieldErrors | Errors;
};

const FIRST_ERR = 0;

export function Fieldset({
  children,
  label,
  errors,
  name = label,
}: FieldsetProps) {
  const errMessage = isCustomErrors(errors)
    ? errors[name][FIRST_ERR]
    : `${errors[name]?.message || ''}`;

  return (
    <fieldset className={classes.fieldset} title={errMessage}>
      <span
        className={`${classes.error} ${classes.lineClamp}`}
        data-testid={`error-${name}`}
      >
        {errMessage}
      </span>
      <div className={classes.inputContainer}>
        <label
          className={classes.lineClamp}
          htmlFor={name}
          data-testid={`form-label-${name}`}
        >
          {label}
        </label>

        {children}
      </div>
    </fieldset>
  );
}
