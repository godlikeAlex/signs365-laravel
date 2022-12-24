import api from "@/src/api";

export default class AuthService {
  static login(email, password) {
    return api.post("/login", { email, password });
  }

  static register() {}
}
