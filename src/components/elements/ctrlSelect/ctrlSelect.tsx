import { List } from '@/types/types';
import { FieldErrors } from 'react-hook-form';
import { Fieldset } from '../fieldset/fieldset';

type CtrlSelectProps = {
  register: object;
  label: string;
  name?: string;
  errors: FieldErrors;
  options: List[];
};

export function CtrlSelect({
  register,
  label,
  options,
  name = label,
  errors,
}: CtrlSelectProps) {
  return (
    <Fieldset errors={errors} label={label}>
      <select {...register} id={name} data-testid={`form-select-${name}`}>
        {options.map((option) => (
          <option key={option.code}>{option.name}</option>
        ))}
      </select>
    </Fieldset>
  );
}
