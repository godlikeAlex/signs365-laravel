export interface ErrorFromAxiosMessage {
  type: "message";
  error: string;
}

export interface ErrorFromAxiosValidation {
  type: "message";
  errors: {
    [k: string]: string[];
  };
}

export type ErrorFromAxios = ErrorFromAxiosMessage | ErrorFromAxiosMessage;
