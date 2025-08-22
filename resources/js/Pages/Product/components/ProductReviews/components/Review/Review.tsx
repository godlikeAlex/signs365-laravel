import { IReview } from "@/src/types/models";

import defaultProfileAvatar from "@/assets/images/default-profile.png";

import classes from "./Review.module.scss";
import { Rating, ReviewUserAvatar } from "@/src/components";
import classNames from "classnames";
import dayjs from "dayjs";

interface Props extends IReview {
  onClickMedia: () => void;
}

export default function Review({
  user,
  review,
  rating,
  media,
  date,
  onClickMedia,
}: Props) {
  return (
    <article className={classes.review}>
      <div className={classes.reviewInfo}>
        <div className={classes.reviewUserInfo}>
          <div>
            <ReviewUserAvatar src={user.avatar} alt={user.name} />
          </div>
          <span>{user.name}</span>
        </div>

        <div className={classes.reviewUserInfo}>
          <Rating rating={rating} size="md" withLabel={false} />
          {date && <span>{dayjs(date).format("D MMM YYYY")}</span>}
        </div>
      </div>

      <div className={classes.reviewContent}>{review}</div>

      {media.length > 0 && (
        <div
          className={classNames(classes.reviewMediaContainer, {
            [classes.reviewMediaContainerThree]: media.length === 3,
            [classes.reviewMediaContainerFour]: media.length === 4,
            [classes.reviewMediaContainerFive]: media.length >= 5,
          })}
        >
          {media.map(({ id, file_path }) => (
            <img
              className={classes.reviewMediaImage}
              key={id}
              src={`/storage/${file_path}`}
              onClick={() => onClickMedia()}
            />
          ))}
        </div>
      )}
    </article>
  );
}
