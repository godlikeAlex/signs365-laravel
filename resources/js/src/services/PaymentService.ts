import api from "../api";

export default class PaymentService {
  static createPaymentIntent() {
    return api.post<{ client_secret: string; payment_intent_id: string }>(
      "/payment-intent"
    );
  }

  static updateTempOrder(tempOrderID: number | string, data: any) {
    return api.post(`temp-order/update/${tempOrderID}`, data);
  }

  static updateOrderInCheckout(paymentIntentID: string, data: any) {
    return api.post(`checkout/update-order/${paymentIntentID}`, data);
  }

  static getPaymentIntent(payment_intent) {
    return api.get<{
      status: "completed" | "in proccess" | "canceled";
      uuid?: string;
      email?: string;
    }>(`/payment-intent/retrive/${payment_intent}`);
  }
}
