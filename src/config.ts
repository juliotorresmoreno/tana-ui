// @ts-ignore
import config from "@/../config.yaml";

interface Config {
  apiUrl: string;
  wsUrl: string;
}

export function getConfig(): Config {
  return config;
}
