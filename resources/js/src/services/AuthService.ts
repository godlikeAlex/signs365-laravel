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
    await api.get("/sanctum/csrf-cookie");
    return api.post("/auth/logout");
  }
}
