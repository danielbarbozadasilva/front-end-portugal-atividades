export interface ProfileClientProps {
  onSubmit: (data: IProfileClient) => void;
}

export interface IProfileClient {
  name: string;
  email: string;
  documentValue: string;
  country: string;
  mobilePhone: string;
  whatsapp?: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  birthDate?: string | Date;
  password?: string;
  confirmPassword?: string;
}

export type TFormErrors = {
  [key: string]: string;
};