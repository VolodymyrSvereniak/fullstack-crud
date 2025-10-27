export interface Client {
  id?: number;
  name: string;
  email: string;
  job: string;
  rate: number | string;
  isActive: boolean;
}
