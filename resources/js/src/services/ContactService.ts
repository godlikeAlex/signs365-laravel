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

  static sendVendorContact(data: {
    fullName: string;
    email: string;
    phone: string;
    state: string;
    workType: string[];
    otherWorkType?: string;
  }) {
    const workTypeParts = [...data.workType];

    if (data.otherWorkType?.trim()) {
      workTypeParts.push(`Other: ${data.otherWorkType.trim()}`);
    }

    return api.post<{ ok: boolean }>(`/request/vendor`, {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      state: data.state,
      workType: workTypeParts.join(", "),
    });
  }
}
