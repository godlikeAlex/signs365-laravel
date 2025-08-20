import api from "@/src/api";

import { IReviewsPaginationResponse } from "@/src/types/axiosResponses";
import { GetReviewsParams } from "@/src/types/servicesParams";

export default class ReviewService {
  static async getReviews({
    page,
    sort,
  }: GetReviewsParams): Promise<IReviewsPaginationResponse> {
    const searchParams = new URLSearchParams();

    searchParams.set("page", `${page}`);
    searchParams.set("sort", sort);

    const { data } = await api.get<IReviewsPaginationResponse>(
      `/product/reviews?${searchParams.toString()}`
    );

    return data;
  }
}
