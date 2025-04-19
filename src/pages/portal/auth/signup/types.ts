export type PageTitle = {
  title: string;
};

export interface ISignUpInterface {
  user: string;
  name: string;
  birthDate: Date;
  cpf: string;
  phones: string[];
  email: string;
  password: string;
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
