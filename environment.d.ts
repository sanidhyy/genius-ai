// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // openai api key
      OPENAI_API_KEY: string;

      // replicate api token
      REPLICATE_API_TOKEN: string;
    }
  }
}
