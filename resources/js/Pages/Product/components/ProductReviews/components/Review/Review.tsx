import { IReview } from "@/src/types/models";

import defaultProfileAvatar from "@/assets/images/default-profile.png";

import classes from "./Review.module.scss";
import { Rating } from "@/src/components";

interface Props extends IReview {}

export default function Review({ user, review, rating }: Props) {
  return (
    <article className={classes.review}>
      <div className={classes.reviewInfo}>
        <div className={classes.reviewUserInfo}>
          <div>
            <img
              className={classes.reviewUserAvatar}
              src={defaultProfileAvatar}
              alt={user.name}
            />
          </div>
          <span>{user.name}</span>
        </div>

        <div className={classes.reviewUserInfo}>
          <Rating rating={rating} size="md" withLabel={false} />
          <span>17 aug 2025</span>
        </div>
      </div>

      <div className={classes.reviewContent}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, odit
        molestias cupiditate nostrum autem ducimus ipsa voluptatum magni
        repellat hic ea, voluptate totam pariatur quae, mollitia ex quos odio
      </div>
    </article>
  );
}
