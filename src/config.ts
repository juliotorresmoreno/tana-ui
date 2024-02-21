// @ts-ignore
import config from "@/../config.yaml";

interface Config {
  apiUrl: string;
  aiUrl: string;
}

export function getConfig(): Config {
  return config;
}
