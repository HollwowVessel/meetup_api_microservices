import { type IMeetup } from '../schemes/meetup/interfaces';

export type UserInfo = {
  accessToken: string;
  refreshToken: string;
  username: string;
  id: string;
  email: string;
  role: 'user' | 'creator';
};

export type Result = {
  result: IMeetup | IMeetup[] | UserInfo | string;
  status: number;
  err?: boolean;
};

export type UserData = {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'creator';
};
