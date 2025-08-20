import { useState } from "react";
import classNames from "classnames";

import useReviews from "./useReviews";
import Review from "./components/Review";

import { Button, Rating, Select } from "@/src/components";
import useIntersectionObserver from "@/src/hooks/useIntersectionObserver";
import SelectProductFile from "@/src/components/SelectProductFile";

import productClasses from "@/Pages/Product/Product.module.scss";
import classes from "./ProductReviews.module.scss";

interface Props {
  totalReviews: number;
  averageRating: number;
}

type SortOption = { label: string; value: string };

const sortOptions: SortOption[] = [
  { label: "Most Recent", value: "created_at,desc" },
  { label: "Highest Rating", value: "rating,desc" },
  { label: "Lowest Rating", value: "rating,asc" },
];

export default function ProductReviews({ totalReviews, averageRating }: Props) {
  const [sort, setSort] = useState<SortOption>(() => sortOptions[0]);

  const reviews = useReviews({ sort: sort.value });

  return (
    <section className={productClasses.productSection}>
      <div className="container">
        <div
          className={classNames(
            productClasses.productInfoSection,
            productClasses.productReviewsSection
          )}
        >
          <div className="row">
            <div className="col-md-12">
              <div className={productClasses.reviewSectionTitle}>
                <h3 className={productClasses.productInfoSectionTitle}>
                  Reviews {averageRating}
                </h3>
                <Rating rating={averageRating} withLabel={false} size="lg" />
              </div>

              <p className={productClasses.reviewSectionDescription}>
                Average rating based on {totalReviews} reviews
              </p>
            </div>

            <div className="col-md-12">
              <Select
                className={classes.productReviewSort}
                placeholder={"Sort By"}
                isSearchable={false}
                options={sortOptions}
                value={sort}
                size="sm"
                onChange={(newSort: SortOption) => setSort(newSort)}
              />
            </div>

            <div className="col-md-12">
              {reviews.data?.map((review) => (
                <Review key={review.id} {...review} />
              ))}

              {reviews.hasNextPage && (
                <div className="mt-25 text-center">
                  <Button
                    onClick={() => reviews.fetchNextPage()}
                    disabled={reviews.isFetchingNextPage}
                    variant="primary"
                    color="primary-600"
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
