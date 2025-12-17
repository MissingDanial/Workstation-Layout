declare module "openai" {
  interface OpenAIOptions {
    apiKey: string;
    baseURL?: string;
    dangerouslyAllowBrowser?: boolean;
  }

  export default class OpenAI {
    constructor(options: OpenAIOptions);
    chat: {
      completions: {
        create(request: {
          model: string;
          messages: any[];
          response_format?: { type: "json_object" | "text" };
        }): Promise<any>;
      };
    };
  }
}

