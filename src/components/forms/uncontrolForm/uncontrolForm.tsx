import * as yup from 'yup';
import classes from '../form.module.css';
import { fileToBase64 } from '@/utils/fileToBase64';
import { Form, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { formSchema } from '@/validations/formValidation';
import { BASE_PATH, initialErrors } from '@/utils/constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Fieldset } from '@/components/elements/fieldset/fieldset';
import { add, selectCountries, selectGenders, User } from '@/store/baseSlice';
import { PasswordIndicator } from '@/components/elements/passwordIndicator/passwordIndicator';

export default function UncontrolForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const genders = useAppSelector(selectGenders);
  const [errors, setErrors] = useState(initialErrors);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.target.value = e.target.value.trim();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(initialErrors);
    const formData = new FormData(e.currentTarget);
    const form = Object.fromEntries(formData.entries()) as unknown as User;

    try {
      await formSchema.validate(form, { abortEarly: false });
      if (form.upload instanceof Blob) {
        form.uploadBase64 = await fileToBase64(form.upload);
        delete form.upload;
        form.isRecent = true;
        dispatch(add(form));
        navigate(BASE_PATH);
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((error) => {
          const errorName = error.path || '';
          setErrors((state) => ({
            ...state,
            [`${error.path}`]: [...state[errorName], error.message],
          }));
        });
      }
    }
  };

  return (
    <Form
      className={classes.form}
      onSubmit={handleSubmit}
      data-control="false"
      data-testid="uncontrolled-form"
    >
      <Fieldset errors={errors} label="name">
        <input
          name="name"
          id="name"
          autoFocus
          data-testid="form-input-name"
        ></input>
      </Fieldset>
      <Fieldset errors={errors} label="age">
        <input
          name="age"
          id="age"
          type="number"
          data-testid="form-input-age"
        ></input>
      </Fieldset>
      <Fieldset errors={errors} label="email">
        <input
          name="email"
          id="email"
          autoComplete="email"
          data-testid="form-input-email"
        ></input>
      </Fieldset>
      <Fieldset errors={errors} label="password" name="password-1">
        <div className={classes.passwordContainer}>
          <input
            name="password-1"
            id="password-1"
            type="password"
            autoComplete="current-password"
            data-testid="form-input-password"
            onChange={handlePasswordChange}
          ></input>
          <PasswordIndicator password={password} />
        </div>
      </Fieldset>
      <Fieldset errors={errors} label="confirm password" name="password-2">
        <input
          name="password-2"
          id="password-2"
          type="password"
          autoComplete="current-password"
          data-testid="form-input-confirm-password"
        ></input>
      </Fieldset>
      <Fieldset errors={errors} label="gender">
        <select name="gender" id="gender" data-testid="form-select-gender">
          {genders.map((gender) => (
            <option key={gender.code}>{gender.name}</option>
          ))}
        </select>
      </Fieldset>
      <Fieldset errors={errors} label="country">
        <input
          name="country"
          id="country"
          type="search"
          list="countries"
          data-testid="form-select-country"
        ></input>
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country.code} value={country.name}></option>
          ))}
        </datalist>
      </Fieldset>
      <Fieldset errors={errors} name="upload" label="upload picture">
        <input
          name="upload"
          id="upload"
          type="file"
          data-testid="form-input-upload"
        ></input>
      </Fieldset>
      <Fieldset
        errors={errors}
        name="terms"
        label="Terms and Conditions agreement"
      >
        <input
          name="terms"
          id="terms"
          type="checkbox"
          data-testid="form-input-terms"
        ></input>
      </Fieldset>

      <button
        className={classes.submitButton}
        type="submit"
        data-testid="form-button-submit"
      >
        submit
      </button>
    </Form>
  );
}
