export interface ErrorFromAxiosMessage {
  type: "message";
  error: string;
}

export interface ErrorFromAxiosValidation {
  type: "validation";
  errors: {
    [k: string]: string[];
  };
}

export type ErrorFromAxios = ErrorFromAxiosMessage | ErrorFromAxiosValidation;
