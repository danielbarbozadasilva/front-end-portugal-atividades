import { IUser } from "./models.user";

type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
type AgentStatus = 'Ativo' | 'Inativo' | 'Pendente';
type AccountType = 'Conta Corrente' | 'Poupança';
type PaymentGateway = 'Stripe' | 'PayPal' | 'Outro';

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
  accountHolder?: string;
  paymentPreferences: {
    preferredGateway?: PaymentGateway;
    accountDetails?: {
      [key in PaymentGateway]?: any;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}