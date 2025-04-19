import { AgentType, ISignUpAgent, TFormErrors } from "./types";

export function formatDocByCountry(docValue: string, country: string, agentType: AgentType): string {
  if (country.toUpperCase() !== 'BR') {
    return docValue;
  }

  let cleanValue = docValue.replace(/\D/g, '');

  if (agentType === 'Pessoa Física') {
    // CPF
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
  }

  if (agentType === 'Pessoa Jurídica') {
    // CNPJ
    if (cleanValue.length <= 14) {
      return cleanValue.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }
  }

  return cleanValue;
}

export function formatPhoneByCountry(phone: string, country: string): string {
  let raw = phone.replace(/\D/g, '');

  switch (country.toUpperCase()) {
    case 'BR':
      // (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
      if (raw.length === 11) {
        return raw.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      }
      return raw;

    case 'PT':
      // 9 dígitos -> 912 345 678
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      }
      return raw;

    case 'FR':
      // França, 10 dígitos -> 06 12 34 56 78
      if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
      }
      return raw;

    case 'ES':
      // Espanha, 9 dígitos -> 612 34 56 78
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
      }
      return raw;

    case 'US':
      // EUA, 10 dígitos -> (123) 456-7890
      if (raw.length === 10) {
        return raw.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
      }
      return raw;

    case 'UK':
      // Reino Unido
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

export function isNotValid(agent: ISignUpAgent, formErrors: TFormErrors): boolean {
  const hasAnyError = Object.values(formErrors).some((err) => err.trim() !== '');

  const requiredFields = [
    agent.name,
    agent.email,
    agent.password,
    agent.confirmPassword,
    agent.agentType,
    agent.mobilePhone,
    agent.zipCode,
    agent.street,
    agent.number,
    agent.neighborhood,
    agent.city,
    agent.state,
    agent.country
  ];

  const hasEmptyRequiredField = requiredFields.some(
    (field) => !field || field.trim() === ''
  );

  return hasAnyError || hasEmptyRequiredField;
}

export function fieldValidate(name: string, value: string, form: ISignUpAgent, t: any): string {
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

    case 'agentType':
      if (!value) {
        message = t('errors.agentTypeEmpty');
      }
      break;

    case 'mobilePhone':
      if (!value.trim()) {
        message = t('errors.phoneBlank');
      } else if (value.replace(/\D/g, '').length < 8) {
        message = t('errors.phoneTooShort');
      }
      break;

    case 'zipCode':
      if (!value.trim()) {
        message = t('errors.zipCodeEmpty');
      } else if (value.replace(/\D/g, '').length < 4) {
        message = t('errors.zipCodeInvalid');
      }
      break;

    case 'street':
    case 'number':
    case 'neighborhood':
    case 'city':
    case 'state':
    case 'country':
      if (!value.trim()) {
        message = t('errors.fieldRequired');
      }
      break;

    default:
      break;
  }

  return message;
}
