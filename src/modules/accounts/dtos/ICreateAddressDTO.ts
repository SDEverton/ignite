interface ICreateAddressDTO {
  id?: string;
  user_id: string;
  street: string;
  number: string;
  neighborhood: string;
  zipcode: string;
  city: string;
  state: string;
}

export { ICreateAddressDTO };
