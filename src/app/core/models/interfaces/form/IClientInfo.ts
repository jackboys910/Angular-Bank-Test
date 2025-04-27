export interface IClientInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: 'male' | 'female';
  birthDate: Date;
  email: string;
  phone: string;
  passport: string;
}
