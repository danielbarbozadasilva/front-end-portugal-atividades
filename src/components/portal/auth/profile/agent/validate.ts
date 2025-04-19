import { AgentType, IProfileAgent, TFormErrors } from "./types";

export function formatDocByCountry(docValue: string, country: string, agentType: AgentType): string {
  if (country.toUpperCase() !== 'BRAZIL') {
    return docValue; // sem formatação para outros países
  }
  let cleanValue = docValue.replace(/\D/g, '');

  // Se for Pessoa Física => CPF
  if (agentType === 'Pessoa Física') {
    // 11 dígitos => 123.456.789-00
    if (cleanValue.length === 11) {
      return cleanValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      );
    }
  }

  // Se for Pessoa Jurídica => CNPJ
  if (agentType === 'Pessoa Jurídica') {
    // 14 dígitos => 12.345.678/0001-90
    if (cleanValue.length === 14) {
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
    case 'BRAZIL':
    case 'BR':
      if (raw.length === 11) {
        return raw.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      }
      return raw;

    case 'PORTUGAL':
    case 'PT':
      // 9 dígitos => 912 345 678
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      }
      return raw;

    case 'FRANCE':
    case 'FR':
      // 10 dígitos => 06 12 34 56 78
      if (raw.length === 10) {
        return raw.replace(
          /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
          '$1 $2 $3 $4 $5'
        );
      }
      return raw;

    case 'SPAIN':
    case 'ES':
      // 9 dígitos => 612 34 56 78
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
      }
      return raw;

    case 'UNITED STATES':
    case 'US':
      // 10 dígitos => (123) 456-7890
      if (raw.length === 10) {
        return raw.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
      }
      return raw;

    case 'ENGLAND':
    case 'UK':
    case 'UNITED KINGDOM':
      // 10 ou 11 dígitos
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

export function isNotValid(agent: IProfileAgent, formErrors: TFormErrors): boolean {
  const hasAnyError = Object.values(formErrors).some((err) => err.trim() !== '');

  // Campos obrigatórios mínimos
  const requiredFields = [
    agent.name,
    agent.email,
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

  const hasEmptyRequiredField = requiredFields.some((field) => !field || field.trim() === '');
  return hasAnyError || hasEmptyRequiredField;
}

export function fieldValidate(name: string, value: string, form: IProfileAgent, t: any): string {
  let message = '';
  let regex: RegExp;
  switch (name) {
    case 'name':
      regex = /\d/;
      if (regex.test(value)) {
        message = t?.('errors.nameNoNumbers') || 'O nome não pode conter números.';
      } else if (!value.trim()) {
        message = t?.('errors.nameBlank') || 'O nome não pode ficar em branco.';
      } else if (value.trim().length < 4) {
        message = t?.('errors.nameMin4') || 'O nome deve ter pelo menos 4 caracteres.';
      } else if (value.trim().length > 50) {
        message = t?.('errors.nameMax50') || 'O nome deve ter no máximo 50 caracteres.';
      }
      break;

    case 'email':
      regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value.trim()) {
        message = t?.('errors.emailBlank') || 'O e-mail não pode ficar em branco.';
      } else if (!regex.test(value.toLowerCase())) {
        message = t?.('errors.emailInvalid') || 'E-mail inválido.';
      }
      break;

    case 'agentType':
      if (!value) {
        message = t?.('errors.agentTypeEmpty') || 'Tipo de agente não selecionado.';
      }
      break;

    case 'mobilePhone':
      if (!value.trim()) {
        message = t?.('errors.phoneBlank') || 'Telefone principal é obrigatório.';
      } else if (value.replace(/\D/g, '').length < 8) {
        message = t?.('errors.phoneTooShort') || 'Telefone muito curto.';
      }
      break;

    case 'zipCode':
      if (!value.trim()) {
        message = t?.('errors.zipCodeEmpty') || 'CEP/Código postal não pode ficar em branco.';
      } else if (value.replace(/\D/g, '').length < 4) {
        message = t?.('errors.zipCodeInvalid') || 'CEP/Código postal inválido.';
      }
      break;

    case 'street':
    case 'number':
    case 'neighborhood':
    case 'city':
    case 'state':
    case 'country':
      if (!value.trim()) {
        message = t?.('errors.fieldRequired') || 'Campo obrigatório.';
      }
      break;

    default:
      break;
  }

  return message;
}
