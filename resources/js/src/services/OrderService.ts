import api from "../api";
import { IOrdersPagenation } from "../types/axiosResponses";

export default class OrderService {
  static async orders(page: number) {
    return api.get<IOrdersPagenation>(`/orders?page=${page}`);
  }

  static async getOrderItemImages(orderItemID: number | string) {
    return api.get<{ images: string[] }>(`/order-item/${orderItemID}/images`);
  }

  static async deleteImageFromOrderItem(
    orderItemID: number | string,
    path: string
  ) {
    return api.post<{ ok: boolean }>(
      `/order-item/${orderItemID}/images/delete`,
      { path }
    );
  }

  static async uploadFilesToOrderItems(
    orderItemID: number | string,
    files: any[]
  ) {
    const formData = new FormData();

    files.forEach((item) => formData.append(`files[]`, item));

    return api.post<{ ok: boolean }>(
      `/order-item/${orderItemID}/images/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
}
