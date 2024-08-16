import classes from '../form.module.css';
import { BASE_PATH } from '@/utils/constants';
import { KeyboardEvent, useState } from 'react';
import { fileToBase64 } from '@/utils/fileToBase64';
import { Form, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { formSchema } from '@/validations/formValidation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Fieldset } from '@/components/elements/fieldset/fieldset';
import { CtrlInput } from '@/components/elements/ctrlInput/ctrlInput';
import { CtrlSelect } from '@/components/elements/ctrlSelect/ctrlSelect';
import { add, selectCountries, selectGenders, User } from '@/store/baseSlice';
import { PasswordIndicator } from '@/components/elements/passwordIndicator/passwordIndicator';
import { CtrlInputWithDatalist } from '@/components/elements/ctrlInputWithDatalist/ctrlInputWithDatalist';

export default function ControlForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const genders = useAppSelector(selectGenders);
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'all',
  });

  const handlePasswordChange = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      e.target.value = e.target.value.trim();
      setPassword(e.target.value);
    }
  };

  const onSubmit: SubmitHandler<User> = async (validData) => {
    const form = { ...validData };
    if (form.upload && '0' in form.upload && form.upload[0] instanceof Blob) {
      form.uploadBase64 = await fileToBase64(form.upload['0']);
      delete form.upload;
      form.isRecent = true;
      dispatch(add(form));
      navigate(BASE_PATH);
    }
  };

  return (
    <Form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
      data-control="false"
      data-testid="controlled-form"
    >
      <CtrlInput
        register={{ ...register('name') }}
        label="name"
        errors={errors}
      />
      <CtrlInput
        register={{ ...register('age') }}
        label="age"
        type="number"
        errors={errors}
      />
      <Fieldset errors={errors} label="email">
        <input
          id="email"
          type="email"
          {...register('email')}
          autoComplete="username"
          data-testid="form-input-email"
        ></input>
      </Fieldset>
      <Fieldset errors={errors} label="password" name="password-1">
        <div className={classes.passwordContainer}>
          <input
            id="password-1"
            type="password"
            {...register('password-1')}
            autoComplete="current-password"
            data-testid="form-input-password"
            onKeyUp={handlePasswordChange}
          ></input>
          <PasswordIndicator password={password} />
        </div>
      </Fieldset>
      <Fieldset errors={errors} label="confirm password" name="password-2">
        <input
          id="password-2"
          type="password"
          {...register('password-2')}
          autoComplete="new-password"
          data-testid="form-input-password-2"
        ></input>
      </Fieldset>
      <CtrlSelect
        register={{ ...register('gender') }}
        label="gender"
        errors={errors}
        options={genders}
      />
      <CtrlInputWithDatalist
        errors={errors}
        label="country"
        options={countries}
        list="countries"
        register={{ ...register('country') }}
      />
      <CtrlInput
        register={{ ...register('upload') }}
        name="upload"
        label="upload picture"
        type="file"
        errors={errors}
      />
      <CtrlInput
        register={{ ...register('terms') }}
        name="terms"
        label="Terms and Conditions agreement"
        type="checkbox"
        errors={errors}
      />

      <button
        className={classes.submitButton}
        type="submit"
        data-testid="button-submit"
        disabled={!isValid}
      >
        submit
      </button>
    </Form>
  );
}
