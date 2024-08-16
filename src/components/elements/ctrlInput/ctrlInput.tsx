import { FieldErrors } from 'react-hook-form';
import { Fieldset } from '../fieldset/fieldset';

type FieldProps = {
  register: object;
  label: string;
  name?: string;
  list?: string;
  errors: FieldErrors;
  type?: string;
};

export function CtrlInput({
  register,
  label,
  name = label,
  errors,
  type = 'text',
  list,
}: FieldProps) {
  return (
    <Fieldset errors={errors} label={label} name={name}>
      <input
        id={name}
        type={type}
        list={list || ''}
        data-testid={`form-input-${name}`}
        {...register}
      />
    </Fieldset>
  );
}
