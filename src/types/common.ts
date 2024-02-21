export type sources = "people" | "groups" | "bot";

export interface Connection {
  id: number;
  name: string;
  description: string;
  photo_url: string;
  feeling: string;
  type: sources;
}
