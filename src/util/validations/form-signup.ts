import moment from 'moment';

/**
 * Interface principal do cliente
 */
interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

interface IClient {
  user: string;
  name: string;
  birthDate: Date;
  cpf: string;
  phones: string[]; // pode haver mais de um telefone
  address: Address;
  interests: string[];
}

/**
 * Caso você precise de um tipo para os erros,
 * cada chave corresponde ao nome do campo validado,
 * e o valor é a string de erro, se houver.
 */
export type TFormErrors = {
  [key: string]: string;
};

/**
 * Verifica se o formulário está inválido.
 * Retorna TRUE se houver algum erro ou
 * se algum campo obrigatório estiver vazio.
 */
export function isNotValid(
  client: IClient,
  formErrors: TFormErrors
): boolean {
  // Se existir qualquer mensagem de erro (string não vazia), já é inválido
  const hasAnyError = Object.values(formErrors).some((err) => err.trim() !== '');

  // Verificação de campos obrigatórios (mínimo viável).
  // Ajuste de acordo com sua regra de negócio.
  const requiredFields = [
    client.name,
    client.user,
    client.cpf,
    // phones[0] como obrigatório, se for o caso
    client.phones[0],
    client.address.street,
    client.address.number,
    client.address.district,
    client.address.city,
    client.address.state,
    client.address.zipCode,
  ];

  // Se algum campo obrigatório estiver vazio/undefined/null, retorna true
  const hasEmptyRequiredField = requiredFields.some(
    (field) => !field || field.trim() === ''
  );

  return hasEmptyRequiredField || hasAnyError;
}

/**
 * Valida campo a campo, retornando mensagem de erro se houver.
 */
export function fieldValidate(
  name: string,
  value: string,
  form: IClient
): string {
  let message = '';
  let regex: RegExp;

  switch (name) {
    /**
     * Validando 'name'
     */
    case 'name':
      // Exemplo: não pode conter números, não pode ser vazio,
      // mínimo de 4 caracteres, máximo de 30.
      regex = /\d/; // qualquer dígito
      if (regex.test(value)) {
        message = 'O nome não pode conter números.';
      } else if (!value.trim()) {
        message = 'O nome não pode ficar em branco.';
      } else if (value.trim().length < 4) {
        message = 'O nome deve ter pelo menos 4 caracteres.';
      } else if (value.trim().length > 30) {
        message = 'O nome deve ter no máximo 30 caracteres.';
      }
      break;

    /**
     * Validando 'user' (usuário)
     */
    case 'user':
      // Exemplo: não pode ser vazio, mínimo 4, máximo 20
      if (!value.trim()) {
        message = 'O nome de usuário não pode ficar em branco.';
      } else if (value.trim().length < 4) {
        message = 'O usuário deve ter pelo menos 4 caracteres.';
      } else if (value.trim().length > 20) {
        message = 'O usuário deve ter no máximo 20 caracteres.';
      }
      break;

    /**
     * Validando 'cpf'
     */
    case 'cpf':
      // Exemplo: verificar se tem 11 dígitos (após remover pontuações).
      const rawCpf = value
        .replace(/\./g, '')
        .replace(/-/g, '')
        .replace(/_/g, '')
        .trim();

      if (rawCpf.length !== 11) {
        message = 'CPF inválido. Deve conter 11 dígitos.';
      }
      break;

    /**
     * Validando 'phones' (caso seja um único campo de telefone no form).
     * Se você tiver vários telefones e um input para cada, trate-os por índice.
     */
    case 'phones':
      // Supõe-se que seja o primeiro telefone
      // Remove pontuações, traços, espaços
      const phone = value
        .replace(/[-_\s]/g, '')
        .trim();

      // Exemplo de regex simples (BR), mas pode adaptar internacional
      regex = /^\+?[0-9]{8,15}$/;
      if (phone && !regex.test(phone)) {
        message = 'Telefone inválido. Utilize apenas dígitos e código de país, se necessário.';
      }
      break;

    /**
     * Validando campos de endereço individualmente:
     * 'street', 'number', 'district', 'city', 'state', 'zipCode'
     */
    case 'street':
    case 'number':
    case 'district':
    case 'city':
    case 'state':
    case 'zipCode':
      if (!value.trim()) {
        message = 'Este campo é obrigatório.';
      }
      // Se quiser regras específicas, coloque-as aqui.
      break;

    /**
     * Validando 'birthDate'
     * Aqui value normalmente vem como string "YYYY-MM-DD",
     * mas no form está como Date. Ajuste conforme o que realmente recebe.
     */
    case 'birthDate':
      // Se vier no formato "YYYY-MM-DD", podemos converter e checar:
      if (!value) {
        message = 'Data de nascimento não pode ficar em branco.';
      } else {
        const today = moment().startOf('day');
        const dateBirth = moment(value, 'YYYY-MM-DD'); // se vier nesse formato
        if (!dateBirth.isValid()) {
          message = 'Data inválida.';
        } else if (dateBirth.isAfter(today)) {
          message = 'Data de nascimento não pode ser futura.';
        } else if (moment().diff(dateBirth, 'years') < 18) {
          message = 'O usuário deve ter pelo menos 18 anos.';
        }
      }
      break;

    /**
     * Campos extras, se existirem...
     * case 'interests':
     *   ...
     *   break;
     */
    default:
      break;
  }

  return message;
}
