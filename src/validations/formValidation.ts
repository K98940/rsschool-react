import * as yup from 'yup';
import countriesJSON from '../store/countries.json';

const FILE_SIZE_LIMIT = 100;
function checkAgreement(agree: boolean | string | undefined) {
  return Boolean(agree);
}

function checkCountry(countryName: string | undefined): boolean {
  return Boolean(
    countriesJSON.find((country) => country.name === countryName)?.name,
  );
}

function checkAgeisRequired(age: string | undefined): boolean {
  return Boolean(age);
}

function checkAgeisLimit(age: string | undefined): boolean {
  if (!age) return true;
  return Boolean(Number(age) > 0);
}

function checkFileSize(fileList: Blob | Blob[]): boolean {
  const file = fileList instanceof Blob ? fileList : fileList[0];

  if (!file) return false;
  return file.size < FILE_SIZE_LIMIT * 1024;
}

function checkFileType(fileList: Blob | Blob[]): boolean {
  const file = fileList instanceof Blob ? fileList : fileList[0];

  if (!file) return false;
  return (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg'
  );
}

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][A-Za-z0-9_ -]*/, 'First letter must be uppercase'),
  age: yup
    .string()
    .test('age-is-required', 'Age is required', checkAgeisRequired)
    .test(
      'age-is-limit',
      'Age must be no negative value (and no zero)',
      checkAgeisLimit,
    ),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  'password-1': yup
    .string()
    .required('Password is required')
    .matches(
      /[~!@#$%^&*()\-+\\|/=_?:;№"`.,<>]+/,
      'Password must have at least one special character',
    )
    .matches(/[a-zа-я]+/, 'Password must have at least one lowercased letter')
    .matches(/[A-ZА-Я]+/, 'Password must have at least one uppercased letter')
    .matches(/[0-9]+/, 'Password must have at least one digit')
    .min(4, 'Password length must be at least four characters'),
  'password-2': yup
    .string()
    .oneOf([yup.ref('password-1')], 'Password must match'),
  gender: yup.string().required('Gender is required'),
  country: yup
    .string()
    .required('Country is required')
    .test(
      'country-is-correct',
      'The country must match with the list',
      checkCountry,
    ),
  terms: yup
    .mixed<boolean | string>()
    .required('Agreement is required')
    .test('agree-test', 'Agreement is required', checkAgreement),
  upload: yup
    .mixed<Blob | Blob[]>()
    .required('Picture is required')
    .test('file-type', 'File type whether .png or .jpg', checkFileType)
    .test('file-size', `File size limit ${FILE_SIZE_LIMIT}kb`, checkFileSize),
});
