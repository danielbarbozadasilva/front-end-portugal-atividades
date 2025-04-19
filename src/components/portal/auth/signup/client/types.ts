export interface IClient {
  username: string;
  name: string;
  birthDate: Date;
  country: string;
  documentType: string;
  documentValue: string;
  phones: string[];
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  interests: string[];
}

export type TFormErrors = {
  [key: string]: string;
};

export interface SignUpProps {
  submit: any;
}
