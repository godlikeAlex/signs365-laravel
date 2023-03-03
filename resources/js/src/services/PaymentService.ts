import api from "../api";

export default class PaymentService {
  static retrivePaymentIntent() {
    return api.post<{ client_secret: string; temp_order_id: string }>(
      "/payment-intent"
    );
  }

  static updateTempOrder(tempOrderID: number | string, data: any) {
    return api.post(`temp-order/update/${tempOrderID}`, data);
  }

  static getPaymentIntent(payment_intent) {
    return api.get<{
      status: "completed" | "in proccess";
      uuid?: string;
      email?: string;
    }>(`/payment-intent/retrive/${payment_intent}`);
  }
}
