import React, { useState } from "react";
import Modal from "../Modal";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import Rating from "../Rating";
import classNames from "classnames";
import { IReview } from "@/src/types/models";

import classes from "./ReviewModal.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ReviewUserAvatar from "../ReviewUserAvatar";

interface Props extends React.ComponentProps<typeof Modal> {
  review: IReview;
}

export default function ReviewModal({ review, ...props }: Props) {
  const [showMobileReview, setShowMobileReview] = useState(false);

  return (
    <Modal
      {...props}
      customClasses={{
        modal: classNames({
          [classes.modalRootDisableScroll]: true,
        }),
        content: classes.reviewModalContent,
        backDrop: classes.reviewModalBackdrop,
        contentWrapper: classes.reviewModalContentWrapper,
      }}
    >
      <div className={classes.reviewModalContainerImages}>
        <Swiper className={classes.swiperReview}>
          {review.media.map((media) => (
            <SwiperSlide
              key={media.file_path}
              className={classes.swiperReviewSlide}
            >
              {media.file_type === "image" ? (
                <img src={`/storage/${media.file_path}`} alt="" />
              ) : (
                <video controls>
                  <source
                    src={`/storage/${media.file_path}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video.
                </video>
              )}
            </SwiperSlide>
          ))}

          <SwiperNavigation />
        </Swiper>
      </div>

      <div
        // style={{ overflow: "hidden" }}
        className={classNames(classes.reviewModalContainerInfo, {
          [classes.reviewModalContainerInfoOpen]: showMobileReview,
        })}
      >
        <button
          className={classes.reviewModalCloseRoot}
          onClick={() => props.close()}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className={classes.reviewModalContainerInfoContent}>
          <div className={classes.reviewModalCloseContainer}>
            <button
              className={classes.reviewModalClose}
              onClick={() => setShowMobileReview(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className={classes.reviewModalUser}>
            <ReviewUserAvatar src={review.user.avatar} alt={review.user.name} />

            <div>
              {review.user.name}
              <Rating rating={review.rating} />
            </div>
          </div>

          <div className={classes.reviewModalText}>{review.review}</div>
        </div>
      </div>

      <div className={classes.reviewModalPreview}>
        <div className={classes.reviewModalPreviewTitle}>
          <div className={classes.reviewModalPreviewName}>
            {review.user.name}
            <Rating rating={review.rating} withLabel={false} />
          </div>
          <button
            className={classes.reviewModalPreviewButton}
            onClick={() => setShowMobileReview(true)}
          >
            Show Review
          </button>
        </div>

        <p className={classes.reviewModalPreviewText}>
          {review.review.length > 30
            ? review.review.slice(0, 30) + "…"
            : review.review}
        </p>
      </div>
    </Modal>
  );
}

const SwiperNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className="swipper-nav">
      <div
        onClick={() => swiper.slidePrev()}
        className="slide-prev-swiper swipper-arrow"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>

      <div
        onClick={() => swiper.slideNext()}
        className="slide-next-swiper swipper-arrow"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};
