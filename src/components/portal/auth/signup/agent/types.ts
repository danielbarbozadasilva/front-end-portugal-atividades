
export type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
export type AgentStatus = 'Ativo' | 'Inativo' | 'Pendente';
export type AccountType = 'Conta Corrente' | 'Poupança';
export type userTypes = 'agent';

export interface IUser {
  _id: string;
  hash: string;
  salt: string;
  name: string;
  email: string;
  username: string;
  permissions: userTypes[];
  recovery?: {
    token?: string;
    date?: Date;
  };
  refreshToken?: {
    data: string;
    expiresIn: number;
    iv: string;
  };
  createdAt: Date;
  updatedAt: Date;
  wasNew?: any;
}

export type PaymentGateway = 'Stripe';

export interface IAgent {
  _id: string;
  user: IUser;
  agentType: AgentType;
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
  fullName?: string;
  cpf?: string;
  rg?: string;
  birthDate?: Date;
  primaryEmail: string;
  secondaryEmail?: string;
  landlinePhone?: string;
  mobilePhone: string;
  whatsapp?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  cadastur?: string;
  defaultCommission: number;
  agentStatus: AgentStatus;
  notes?: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: AccountType;
  paymentPreferences: {
    preferredGateway?: PaymentGateway;
    accountDetails?: {
      [key in PaymentGateway]?: any;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignUpAgent {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  permissions: userTypes[];
  agentType: AgentType;
  companyName?: string;
  tradeName?: string;
  cpf?: string;
  cnpj?: string;
  birthDate?: Date;
  mobilePhone: string;
  whatsapp?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  bank?: string;
  bankAgency?: string;
  bankAccount?: string;
  accountType?: AccountType;
}

export type TFormErrors = {
  [key: string]: string;
};

export interface SignUpAgentProps {
  submit: any;
}