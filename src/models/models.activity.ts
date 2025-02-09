
type ActivityCategory = 'Passeio' | 'Excursão' | 'Evento' | 'Outro';
type allowedPaymentMethods = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal_account';

// Interface para a localização em formato GeoJSON
export interface ILocationCoordinates {
  type: string; // exemplo: "Point"
  coordinates: number[]; // [longitude, latitude]
}

// Interface para o agente
export interface IAgent {
  _id: string;
  user: string;
  agentType: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
  primaryEmail: string;
  mobilePhone: string;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  defaultCommission: number;
  agentStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface para a avaliação (rating)
export interface IRating {
  _id: string;
  name: string;
  text: string;
  score: number;
  activity: ActivityCategory;
  client: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para o endereço do cliente
export interface IAddress {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

// Interface para o cliente
export interface IClient {
  address: IAddress;
  paymentMethods: allowedPaymentMethods[]; // Se houver uma estrutura definida para métodos de pagamento, substitua "any" por essa interface.
  _id: string;
  user: string;
  name: string;
  birthDate: string;
  cpf: string;
  phones: string[];
  deleted: boolean;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

// Interface para o grupo
export interface IGroup {
  _id: string;
  name: string;
  members: IClient[];
  activity: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para a atividade
export interface IActivity {
  locationCoordinates: ILocationCoordinates;
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  location: string;
  meetingPoint: string;
  price: number;
  featured: boolean;
  promotion?: string;
  images: string[];
  videos: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes: string;
  category: string;
  agent: IAgent[];
  shareCount: number;
  allowedPaymentMethods: allowedPaymentMethods[];
  createdAt: string;
  updatedAt: string;
  rating: IRating[];
  likes: IClient[];
  client: IClient[];
  groups: IGroup[];
  averageRating: number;
}

// Interface para a resposta da API
export interface IActivityResponse {
  status: number;
  success: boolean;
  message: string;
  data: IActivity[];
}

export interface IActivityFilters {
  keyword: string;
  category: string;
  startDate: string;
  endDate: string;
  minPrice: string;
  maxPrice: string;
  language: string;
  lat: string;
  lng: string;
  sort: string;
}

