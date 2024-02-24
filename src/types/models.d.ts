export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  photo_url: string;
  rol: string;
}

export interface Session extends User {}

export interface Message {
  id: string;
  content: string;
  rol: string;
  connection_id: number;
  created_at: string;
}

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
