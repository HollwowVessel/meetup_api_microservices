export type CreateProps = {
  name: string;
  description: string;
  tags: string[];
  timestamps: string;
  participants: string;
  creator_id: string;
};

export type UpdateProps = {
  name: string;
  description: string;
  tags: string[];
  timestamps: string;
  participants: string;
  id: string;
};

export type LoginProps = { email: string; password: string };

export type RegistrationProps = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'creator';
};
