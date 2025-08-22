import { useState } from "react";
import classNames from "classnames";

import useReviews from "./useReviews";
import Review from "./components/Review";

import StarSVG from "@/assets/icons/star.svg?react";

import {
  Button,
  Modal,
  Rating,
  ReviewForm,
  ReviewModal,
  Select,
} from "@/src/components";

import productClasses from "@/Pages/Product/Product.module.scss";
import classes from "./ProductReviews.module.scss";
import StarsOverview from "./components/StarsOverview";
import { SummaryRatting } from "@/src/types/ProductModel";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { IReview } from "@/src/types/models";
import { usePage } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { toast } from "react-toastify";

interface Props {
  totalReviews: number;
  averageRating: number;
  summaryRatings: SummaryRatting;
  productID: number;
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
  productID,
}: Props) {
  const { auth } = usePage<SharedInertiaData>().props;

  const { state } = useProductContext();

  const [sort, setSort] = useState<SortOption>(() => sortOptions[0]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedReview, setSelectedReview] = useState<null | IReview>();

  const reviews = useReviews({
    sort: sort.value,
    productID: productID,
  });

  const sendReviewButton = (
    <Button
      onClick={() =>
        auth.user
          ? setIsOpenModal(true)
          : toast("Please log in to your account", { type: "error" })
      }
      className="mt-20"
      variant="ghost"
      color="primary-300"
    >
      Write a review
    </Button>
  );

  const noReviews = (
    <div className="text-center">
      <StarSVG width={80} height={80} />

      <h2 className="mt-25">There are no reviews for this product yet</h2>

      <p className="mb-0">
        Have you purchased from us yet? Be the first to leave a review
      </p>

      {sendReviewButton}
    </div>
  );

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
          </div>
          {reviews.data?.length > 0 ? (
            <div className="row flex-column-reverse flex-md-row">
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
                  <Review
                    key={review.id}
                    onClickMedia={() => setSelectedReview(review)}
                    {...review}
                  />
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

              <div className="col-md-3 mb-25">
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

                {sendReviewButton}
              </div>
            </div>
          ) : (
            noReviews
          )}
        </div>
      </div>

      <Modal isOpen={isOpenModal} close={() => setIsOpenModal(false)}>
        <ReviewForm
          product={{ id: state.product?.id, name: state.product?.title }}
          onSuccess={() => setIsOpenModal(false)}
        />
      </Modal>

      {selectedReview && (
        <ReviewModal
          isOpen={true}
          close={() => setSelectedReview(null)}
          review={selectedReview}
        />
      )}
    </section>
  );
}
