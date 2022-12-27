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

  static getToken() {
    return api.get<User>("/auth/get-token");
  }

  static getAvailableDomains() {
    return api.get<DomainsResponse>("/auth/domains");
  }

  static register() {}
}
