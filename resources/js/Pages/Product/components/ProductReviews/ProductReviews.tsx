import { useState } from "react";
import classNames from "classnames";

import useReviews from "./useReviews";
import Review from "./components/Review";

import { Button, Modal, Rating, ReviewForm, Select } from "@/src/components";

import productClasses from "@/Pages/Product/Product.module.scss";
import classes from "./ProductReviews.module.scss";
import StarsOverview from "./components/StarsOverview";
import { SummaryRatting } from "@/src/types/ProductModel";
import { useProductContext } from "@/src/contexts/MainProductContext";

interface Props {
  totalReviews: number;
  averageRating: number;
  summaryRatings: SummaryRatting;
}

type SortOption = { label: string; value: string };

const sortOptions: SortOption[] = [
  { label: "Most Recent", value: "created_at,desc" },
  { label: "Highest Rating", value: "rating,desc" },
  { label: "Lowest Rating", value: "rating,asc" },
];

export default function ProductReviews({
  totalReviews,
  averageRating,
  summaryRatings,
}: Props) {
  const { state } = useProductContext();

  const [sort, setSort] = useState<SortOption>(() => sortOptions[0]);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
              <h3 className={productClasses.productInfoSectionTitle}>
                What our clients say
              </h3>
            </div>
            <div className="col-md-9">
              <div className={classes.productReviewSort}>
                <Select
                  placeholder={"Sort By"}
                  isSearchable={false}
                  options={sortOptions}
                  value={sort}
                  size="sm"
                  onChange={(newSort: SortOption) => setSort(newSort)}
                />
              </div>

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

            <div className="col-md-3">
              <div className={productClasses.reviewSectionTitle}>
                <Rating rating={averageRating} withLabel={false} size="lg" />

                <h3 className={productClasses.productInfoSectionTitle}>
                  {averageRating} / 5
                </h3>
              </div>

              <p className={productClasses.reviewSectionDescription}>
                Average rating based on {totalReviews} reviews
              </p>

              <StarsOverview summaryRatings={summaryRatings} />

              <Button
                onClick={() => setIsOpenModal(true)}
                className="mt-20"
                variant="ghost"
                color="primary-300"
              >
                Write a review
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpenModal} close={() => setIsOpenModal(false)}>
        <ReviewForm
          product={{ id: state.product?.id, name: state.product?.title }}
          onSuccess={() => setIsOpenModal(false)}
        />
      </Modal>
    </section>
  );
}
