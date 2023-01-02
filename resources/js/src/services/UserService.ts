import api from "../api";
import { User } from "../types/models";
import {
  EditProfileParams,
  ResetPasswordParams,
} from "../types/servicesParams";

export default class UserService {
  static async editProfile(data: EditProfileParams) {
    const formData = new FormData();

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    formData.append("name", data.name);
    formData.append("email", data.email);

    return api.post<User>("profile/edit", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async editPassword(data: ResetPasswordParams) {
    return api.post("/profile/password/edit", data);
  }
}
