interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_licence: string;
  id?: string;
  avatar?: string;
  birth?: string;
  phone_number?: string;
  cpf?: string;
  address?: {
    user_id: string;
    street: string;
    number: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    state: string;
  };
}

export { ICreateUserDTO };
