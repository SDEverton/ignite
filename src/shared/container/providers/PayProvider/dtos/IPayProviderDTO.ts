interface IPayProviderDTO {
  total: number;
  user: {
    name: string;
    email: string;
    cpf: string;
    phone_number: string;
    birth: string;
    address?: {
      user_id: string;
      street: string;
      number: string;
      neighborhood: string;
      zipcode: string;
      city: string;
      state: string;
    };
  };
  rental_id?: string;
  description: string;
  installments?: number;
  payment_token?: string;
  date?: string;
}

export { IPayProviderDTO };
