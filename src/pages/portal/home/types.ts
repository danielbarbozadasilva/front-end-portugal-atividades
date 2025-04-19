export interface ILocationCoordinates {
  type: string;
  coordinates: number[];
}

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

export interface IRating {
  _id: string;
  name: string;
  text: string;
  score: number;
  activity: string;
  client: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddress {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface IClient {
  address: IAddress;
  paymentMethods: any[];
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

export interface IGroup {
  _id: string;
  name: string;
  members: string[];
  activity: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

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
  allowedPaymentMethods: string[];
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

export interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type PageTitle = {
  title: string;
};
