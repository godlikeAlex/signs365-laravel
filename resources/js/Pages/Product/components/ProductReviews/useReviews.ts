import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import ReviewService from "@/src/services/ReviewService";
import { GetReviewsParams } from "@/src/types/servicesParams";

type Params = Omit<GetReviewsParams, "page">;

export default function useReviews({ sort, productID }: Params) {
  return useInfiniteQuery({
    queryKey: ["reviews", sort],
    queryFn: ({ pageParam }) => {
      return ReviewService.getReviews({ page: pageParam, sort, productID });
    },
    initialPageParam: 1,
    getNextPageParam: (result) => {
      const { meta } = result;

      if (meta.current_page === meta.last_page) return null;

      return meta.current_page + 1;
    },
    select: (result) => result.pages.flatMap((page) => page.data),
  });
}
