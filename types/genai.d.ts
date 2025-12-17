declare module '@google/genai' {
  export enum Type {
    OBJECT = 'object',
    STRING = 'string',
    NUMBER = 'number',
    ARRAY = 'array',
  }

  export interface SchemaProperty {
    type: Type;
    description?: string;
    enum?: string[];
    properties?: Record<string, SchemaProperty>;
    items?: SchemaProperty;
    required?: string[];
  }

  export interface Schema {
    type: Type;
    properties?: Record<string, SchemaProperty>;
    items?: SchemaProperty;
    required?: string[];
    description?: string;
    enum?: string[];
  }

  export interface GenerateContentRequest {
    model: string;
    contents: any;
    config?: {
      responseMimeType?: string;
      responseSchema?: Schema;
    };
  }

  export interface GenerateContentResponse {
    text?: string;
  }

  export class GoogleGenAI {
    constructor(options: { apiKey: string });
    models: {
      generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse>;
    };
  }
}


