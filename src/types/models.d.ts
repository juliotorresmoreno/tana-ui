export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  photo_url: string;
  rol: string;
}

export interface Session {
  token: string;
  user: User;
}
