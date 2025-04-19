import { IProfileClient, TFormErrors } from "./types";

export function isNotValid(client: IProfileClient, formErrors: TFormErrors): boolean {
  const hasAnyError = Object.values(formErrors).some((err) => err.trim() !== '');
  const requiredFields = [
    client.name,
    client.email,
    client.documentValue,
    client.mobilePhone,
    client.zipCode,
    client.street,
    client.number,
    client.neighborhood,
    client.city,
    client.state,
    client.country
  ];
  const hasEmpty = requiredFields.some((field) => !field || field.trim() === '');
  return hasAnyError || hasEmpty;
}

export function fieldValidate(
  name: string,
  value: string,
  client: IProfileClient,
  t: (key: string) => string
): string {
  let msg = '';
  let regex: RegExp;

  switch (name) {
    case 'name':
      if (!value.trim()) {
        msg = t('errors.nameBlank');
      } else if (/\d/.test(value)) {
        msg = t('errors.nameNoNumbers');
      } else if (value.trim().length < 4) {
        msg = t('errors.nameMin4');
      } else if (value.trim().length > 50) {
        msg = t('errors.nameMax50');
      }
      break;

    case 'email':
      if (!value.trim()) {
        msg = t('errors.emailBlank');
      } else {
        regex =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value.toLowerCase())) {
          msg = t('errors.emailInvalid');
        }
      }
      break;

    case 'documentValue':
      if (!value.trim()) {
        msg = t('errors.docBlank');
      }
      break;

    case 'mobilePhone':
      if (!value.trim()) {
        msg = t('errors.phoneBlank');
      } else if (value.replace(/\D/g, '').length < 8) {
        msg = t('errors.phoneTooShort');
      }
      break;

    case 'zipCode':
      if (!value.trim()) {
        msg = t('errors.zipCodeEmpty');
      } else if (value.replace(/\D/g, '').length < 4) {
        msg = t('errors.zipCodeInvalid');
      }
      break;

    case 'street':
    case 'number':
    case 'neighborhood':
    case 'city':
    case 'state':
    case 'country':
      if (!value.trim()) {
        msg = t('errors.fieldRequired');
      }
      break;

    case 'password':
      if (client.password) {
        if (client.password.trim().length < 6) {
          msg = t('errors.passwordMin6');
        } else if (client.password.trim().length > 50) {
          msg = t('errors.passwordMax50');
        }
      }
      break;

    case 'confirmPassword':
      if (client.password && value !== client.password) {
        msg = t('errors.passwordsNoMatch');
      }
      break;

    default:
      break;
  }

  return msg;
}

export function formatDocByCountry(docValue: string, country: string): string {
  if (country.toUpperCase() !== 'BR') return docValue;

  const onlyDigits = docValue.replace(/\D/g, '');
  if (onlyDigits.length === 11) {
    // CPF
    return onlyDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  } else if (onlyDigits.length === 14) {
    // CNPJ
    return onlyDigits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
  return onlyDigits;
}

export function formatPhoneByCountry(phone: string, country: string): string {
  const raw = phone.replace(/\D/g, '');
  switch (country.toUpperCase()) {
    case 'BR':
      if (raw.length === 11) {
        return raw.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      }
      return raw;
    case 'PT':
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      }
      return raw;
    case 'FR':
      if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
      }
      return raw;
    case 'ES':
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
      }
      return raw;
    case 'US':
      if (raw.length === 10) {
        return raw.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
      }
      return raw;
    case 'UK':
      if (raw.length === 10) {
        return raw.replace(/^(\d{4})(\d{3})(\d{3})$/, '($1) $2-$3');
      } else if (raw.length === 11) {
        return raw.replace(/^(\d{5})(\d{3})(\d{3})$/, '($1) $2-$3');
      }
      return raw;
    default:
      return raw;
  }
}
