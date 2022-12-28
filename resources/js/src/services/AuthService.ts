import api from "../api";
import { DomainsResponse, LoginResponse } from "../types/axiosResponses";
import { User } from "../types/models";

export default class AuthService {
  static async login(email: string, password: string) {
    await api.get("/sanctum/csrf-cookie");
    return api.post<LoginResponse>("/auth/login", { email, password });
  }

  static getUser() {
    return api.get<User>("user");
  }

  static async register(email: string, password: string, name: string) {
    await api.get("/sanctum/csrf-cookie");
    return api.post<LoginResponse>("/auth/register", { email, password, name });
  }

  static async logout() {
    return api.post("/auth/logout");
  }

  static async sendForgotPasswordRequest(email: string) {
    return api.post("/auth/forgot", { email });
  }

  static async resetPassword(
    token: string,
    password: string,
    passwordConfirmation: string
  ) {
    return api.post("/auth/reset-password", {
      token,
      password,
      passwordConfirmation,
    });
  }
}
