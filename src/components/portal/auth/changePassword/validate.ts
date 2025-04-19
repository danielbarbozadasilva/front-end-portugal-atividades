import { IFormData, TFormErrors } from "./types";

export function fieldValidate(name: string, value: string, form: IFormData): string {
  let message = '';
  switch (name) {
    case 'token':
      if (!value.trim()) {
        message = 'The token cannot be blank.';
      }
      break;

    case 'email': {
      const regexEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value.trim()) {
        message = 'The email cannot be blank.';
      } else if (!regexEmail.test(value.toLowerCase())) {
        message = 'Invalid email.';
      }
      break;
    }

    case 'newPassword':
      if (!value.trim()) {
        message = 'The new password cannot be blank.';
      } else if (value.trim().length < 6) {
        message = 'The password must be at least 6 characters long.';
      }
      break;

    case 'confirmPassword':
      if (!value.trim()) {
        message = 'You must confirm the new password.';
      } else if (value !== form.newPassword) {
        message = 'The passwords do not match.';
      }
      break;

    default:
      break;
  }
  return message;
}

export function isNotValid(form: IFormData, formValidate: TFormErrors): boolean {
  const hasAnyError = Object.values(formValidate).some((err) => err.trim() !== '');

  const requiredFields = [
    form.token,
    form.email,
    form.newPassword,
    form.confirmPassword
  ];

  const anyRequiredFieldEmpty = requiredFields.some(
    (field) => !field || field.trim() === ''
  );

  return hasAnyError || anyRequiredFieldEmpty;
}
