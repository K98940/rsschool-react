import { List } from '@/types/types';
import { FieldErrors } from 'react-hook-form';
import { Fieldset } from '../fieldset/fieldset';

type CtrlInputWithDatalistProps = {
  register: object;
  label: string;
  errors: FieldErrors;
  options: List[];
  list: string;
  name?: string;
};

export function CtrlInputWithDatalist({
  register,
  label,
  options,
  list,
  name = label,
  errors,
}: CtrlInputWithDatalistProps) {
  return (
    <Fieldset errors={errors} label={label}>
      <input
        id={name}
        name={name}
        list={list || ''}
        data-testid={`form-input-${name}`}
        {...register}
      />
      <datalist id={list}>
        {options.map((option) => (
          <option key={option.code} value={option.name}></option>
        ))}
      </datalist>
    </Fieldset>
  );
}
