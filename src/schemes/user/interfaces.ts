export interface IUser {
  email: string;
  password: string;
  username: string;
}

export interface IDefinedValues {
  key: string;
  value: string | string[];
}

export interface IJWTInfo {
  email: string;
  username: string;
  id: string;
  role: 'user' | 'creator';
}
