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
  user: string;
}
