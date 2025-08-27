import api from "@/src/api";

import { IReviewsPaginationResponse } from "@/src/types/axiosResponses";
import {
  CreateReviewParams,
  GetReviewsParams,
} from "@/src/types/servicesParams";

export default class ReviewService {
  static async getReviews({
    page,
    sort,
    productID,
  }: GetReviewsParams): Promise<IReviewsPaginationResponse> {
    const searchParams = new URLSearchParams();

    searchParams.set("page", `${page}`);
    searchParams.set("sort", sort);

    const { data } = await api.get<IReviewsPaginationResponse>(
      `/product/reviews/${productID}/?${searchParams.toString()}`
    );

    return data;
  }

  static async createReview({
    productID,
    rating,
    review,
    media,
    name,
    email,
  }: CreateReviewParams) {
    const formData = new FormData();

    formData.append("rating", `${rating}`);
    formData.append("review", review);
    formData.append("name", name);
    formData.append("email", email);

    media.forEach((file) => {
      formData.append("media[]", file);
    });

    return api.post(`/product/review/${productID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
