type ActivityCategory = 'Passeio' | 'Excursão' | 'Evento' | 'Outro';

export interface IActivity {
  _id: string,
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  location: string;
  meetingPoint?: string;
  price: number;
  featured: boolean;
  promotion?: string;
  images: string[];
  videos?: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string;
  category: ActivityCategory;
  agent: string | IAgent | IAgent[];
  rating: string | IRating | IRating[];
  likes: string[];
  client: string | IClient | IClient[];
  shareCount: number;
  groups: IGroup | IGroup[];
  allowedPaymentMethods: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IGroup {
  _id: string;
  name: string;
  members: string[];
  activity: IActivity;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
type AgentStatus = 'Ativo' | 'Inativo' | 'Pendente';
type AccountType = 'Conta Corrente' | 'Poupança';
type PaymentGateway = 'Stripe' | 'PayPal' | 'Outro';

interface IAgent {
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

interface IRating {
  _id: string;
  name: string;
  text: string;
  score: number;
  activity: string;
  client: IClient | IClient[];
  createdAt: Date;
  updatedAt: Date;
}

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
  _id: string;
  user: IUser;
  name: string;
  birthDate: Date;
  cpf: string;
  phones: string[];
  deleted: boolean;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  paymentMethods: IPaymentMethod | IPaymentMethod[];
  interests: string[];
}

interface IPaymentMethod {
  _id: string;
  client: IClient;
  type: string;
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  fingerprint?: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUser {
  hash: string;
  salt: string;
  name: string;
  email: string;
  username: string;
  permissions: string[];
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