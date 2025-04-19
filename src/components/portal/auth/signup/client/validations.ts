import moment from "moment";
import { IClient, TFormErrors } from "./types";

export function isNotValid(client: IClient, formErrors: TFormErrors): boolean {
  const hasAnyError = Object.values(formErrors).some((err) => err.trim() !== '');

  const requiredFields = [
    client.username,
    client.name,
    client.email,
    client.password,
    client.confirmPassword,
    client.country,
    client.documentType,
    client.documentValue,
    client.phones[0],
    client.address.street,
    client.address.number,
    client.address.district,
    client.address.city,
    client.address.state,
    client.address.zipCode
  ];

  const hasEmptyRequiredField = requiredFields.some((field) => !field || field.trim() === '');
  return hasEmptyRequiredField || hasAnyError;
}

export function fieldValidate(name: string, value: string, form: IClient, t: any): string {
  let message = '';
  let regex: RegExp;

  switch (name) {
    case 'name':
      regex = /\d/;
      if (regex.test(value)) {
        message = t('errors.nameNoNumbers');
      } else if (!value.trim()) {
        message = t('errors.nameBlank');
      } else if (value.trim().length < 4) {
        message = t('errors.nameMin4');
      } else if (value.trim().length > 50) {
        message = t('errors.nameMax50');
      }
      break;

    case 'username':
      if (!value.trim()) {
        message = t('errors.client.userBlank');
      } else if (value.trim().length < 4) {
        message = t('errors.client.userMin4');
      } else if (value.trim().length > 20) {
        message = t('errors.client.userMax20');
      }
      break;

    case 'email':
      regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value.trim()) {
        message = t('errors.emailBlank');
      } else if (!regex.test(value.toLowerCase())) {
        message = t('errors.emailInvalid');
      }
      break;

    case 'password':
      if (!value.trim()) {
        message = t('errors.passwordBlank');
      } else if (value.trim().length < 6) {
        message = t('errors.passwordMin6');
      } else if (value.trim().length > 50) {
        message = t('errors.passwordMax50');
      }
      break;

    case 'confirmPassword':
      if (!value.trim()) {
        message = t('errors.passwordConfirmBlank');
      } else if (value !== form.password) {
        message = t('errors.passwordsNoMatch');
      }
      break;

    case 'documentValue':
      if (!value.trim()) {
        message = t('errors.client.documentBlank');
      } else {
        if (form.documentType === 'CPF') {
          const raw = value.replace(/\D/g, '');
          if (raw.length !== 11) {
            message = t('errors.client.cpfInvalid');
          }
        }
      }
      break;

    case 'phones0': {
      const phoneRaw = value.replace(/\D/g, '');
      if (!phoneRaw) {
        message = t('errors.client.phoneRequired');
      } else if (phoneRaw.length < 8 || phoneRaw.length > 15) {
        message = t('errors.client.phoneInvalidRange');
      }
      break;
    }

    case 'phones1': {
      const phoneRaw = value.replace(/\D/g, '');
      if (phoneRaw && (phoneRaw.length < 8 || phoneRaw.length > 15)) {
        message = t('errors.client.phoneInvalidRange');
      }
      break;
    }

    case 'street':
    case 'number':
    case 'district':
    case 'city':
    case 'state':
    case 'zipCode':
      if (!value.trim()) {
        message = t('errors.fieldRequired');
      }
      break;

    case 'birthDate': {
      if (!value) {
        message = t('errors.client.birthDateBlank');
      } else {
        const today = moment().startOf('day');
        const dateBirth = moment(value, 'YYYY-MM-DD');
        if (!dateBirth.isValid()) {
          message = t('errors.client.birthDateInvalid');
        } else if (dateBirth.isAfter(today)) {
          message = t('errors.client.birthDateFuture');
        } else if (moment().diff(dateBirth, 'years') < 18) {
          message = t('errors.client.birthDateUnder18');
        }
      }
      break;
    }

    case 'country':
      if (!value.trim()) {
        message = t('errors.client.countryEmpty');
      }
      break;

    default:
      break;
  }

  return message;
}

export function formatDocumentValue(documentValue: string, documentType: string) {
  if (documentType === 'CPF') {
    return documentValue
      ?.replace(/\D/g, '')
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d)/, '$1-$2')
      ?.replace(/(-\d{2})\d+?$/, '$1');
  }
  return documentValue;
}

export function getCountryCode(countryName: string): string {
  switch (countryName) {
    case 'Portugal':
      return 'PT';
    case 'Brazil':
      return 'BR';
    case 'England':
      return 'GB';
    case 'United States':
      return 'US';
    case 'France':
      return 'FR';
    case 'Spain':
      return 'ES';
    default:
      return 'PT';
  }
}

export function formatPhoneByCountry(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '');
  return digits;
}