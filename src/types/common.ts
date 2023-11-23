export type sources = "people" | "groups" | "bot";

export interface Connection {
  id: number;
  name: string;
  surname: string;
  description: string;
  image: string;
  type: sources;
}
