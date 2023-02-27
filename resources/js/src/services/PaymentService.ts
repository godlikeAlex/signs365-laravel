import api from "../api";

export default class PaymentService {
  static retrivePaymentIntent() {
    return api.post<{ client_secret: string }>("/payment-intent");
  }
}
