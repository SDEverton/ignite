import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
  brand: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO };
