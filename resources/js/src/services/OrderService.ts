import api from "../api";
import { IOrdersPagenation } from "../types/axiosResponses";

export default class OrderService {
  static async orders(page: number) {
    return api.get<IOrdersPagenation>(`/orders?page=${page}`);
  }
}
