import axios, { AxiosError } from "axios";
import { ErrorFromAxios } from "../types/common";

export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong, please try again later";

export default function axiosErrorGrab(error: any): ErrorFromAxios {
  try {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          return {
            type: "message",
            error: error.response.data.error,
          };

        case 422:
          return { type: "validation", errors: error.response.data.errors };

        default:
          return {
            type: "message",
            error: DEFAULT_ERROR_MESSAGE,
          };
      }
    }

    return {
      type: "message",
      error: DEFAULT_ERROR_MESSAGE,
    };
  } catch (_) {
    return {
      type: "message",
      error: DEFAULT_ERROR_MESSAGE,
    };
  }
}

export function isCustomAxisError(error: any): error is ErrorFromAxios {
  return (error as ErrorFromAxios).type !== undefined;
}
