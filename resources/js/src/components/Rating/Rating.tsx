import StarSVG from "@/assets/icons/star.svg?react";

import classes from "./Rating.module.scss";
import classNames from "classnames";

type Props = {
  rating: number;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
};

const sizes = {
  sm: { fontSize: "8px", size: 10 },
  md: { fontSize: "10px", size: 15 },
  lg: { fontSize: "15px", size: 22 },
};

export default function Rating({
  rating,
  withLabel = true,
  size = "sm",
}: Props) {
  return (
    <div className={classes.rating}>
      {new Array(5).fill("").map((_, idx) => (
        <StarSVG
          key={idx}
          className={classNames(classes.ratingStar, {
            [classes.ratingStarActive]: rating >= idx + 1,
          })}
          width={sizes[size].size}
          height={sizes[size].size}
        />
      ))}

      {withLabel && (
        <span
          className={classes.ratingValue}
          style={{ fontSize: sizes[size].fontSize }}
        >
          {rating}
        </span>
      )}
    </div>
  );
}
