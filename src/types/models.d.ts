export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  photo_url: string;
  rol: string;
}

export interface Session extends User {}

export interface Profile {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url: string;
  verified: boolean;
  business: string;
  position_name: string;
  url: string;
  description: string;
  creation_at: string; // En este caso, creation_at y updated_at se mantienen como strings
  updated_at: string; // ya que tienen un formato de fecha específico y se pueden manejar como strings.
  deleted_at: string;
}

interface Credential {
  id: number;
  api_key: string;
  api_secret: string;
  last_used: string | null;
  creation_at: string;
  deleted_at: string | null;
  updated_at: string;
}

export interface Mmlu {
  id: number;
  name: string;
  photo_url: string;
  description: string;
  provider: string;
  model: string;
  creation_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Message {
  id: number;
  content: string;
  mmlu: Mmlu;
  role: string;
  creationAt: string;
  updatedAt: string;
}

export interface Model {
  code: string;
  provider: string;
}

type Response = {
  message: string;
};
