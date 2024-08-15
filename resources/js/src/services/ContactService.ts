import api from "../api";

export default class ContactService {
  static sendRequestContact(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) {
    return api.post<{ ok: boolean }>(`/request/contacts`, data);
  }
}
