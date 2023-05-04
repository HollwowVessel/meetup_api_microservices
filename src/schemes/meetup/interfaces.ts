export interface IMeetup {
  id: number;
  name: string;
  description?: string;
  tags?: string[];
  timestamp: string;
  timestamps: string;
  participants: number[];
  creator_id: number;
}

export interface IQuery {
  name: string;
  description: string;
  tags: string[];
  to: string;
  from: string;
  sort: 'id' | 'name' | 'timestamp';
}
